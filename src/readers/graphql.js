/**
 * @copyright   2016, Miles Johnson
 * @license     https://opensource.org/licenses/MIT
 */

/* eslint-disable import/no-extraneous-dependencies, no-console */

import fs from 'fs';
import { parse, Kind } from 'graphql';

import type { SchemaStructure } from '../types';

console.log(Kind);

class GraphQLReader {
  constructor(doc) {
    this.document = doc;
    this.primaryKey = '';
    this.attributes = {};
    this.references = {};
    this.enums = {};
    this.shapes = {};
    this.unions = {};

    this.parseDefinitions();
    this.parseAttributes();
  }

  buildAttribute(field, type, nullable = true) {
    // Non-nullable
    if (type.kind === Kind.NON_NULL_TYPE) {
      return this.buildAttribute(field, type.type, false);

    // List
    } else if (type.kind === Kind.LIST_TYPE) {
      return {
        type: 'array',
        valueType: this.buildAttribute(field, type.type),
        nullable,
      };

    // Named
    } else if (type.kind === Kind.NAMED_TYPE) {
      const value = type.name.value;

      switch (value) {
        case 'ID':
          if (this.primaryKey) {
            throw new SyntaxError(`A primary key for ${this.name} has already been defined.`);
          }

          this.primaryKey = field.name.value;

          // GQL denotes ID fields as strings,
          // but we should accept integers as well.
          return {
            type: 'union',
            valueTypes: ['number', 'string'],
            nullable,
          };

        case 'Int':
        case 'Float':
        case 'Number':
        case 'String':
        case 'Boolean':
          return {
            type: value.toLowerCase(),
            nullable,
          };

        default:
          // Enum
          if (this.enums[value]) {
            return {
              type: 'enum',
              valueType: 'number',
              values: this.enums[value],
              nullable,
            };
          }

          // Shapes
          if (this.shapes[value]) {
            return {
              type: 'shape',
              reference: value,
              nullable,
            };
          }

          // Unions
          if (this.unions[value]) {
            return {
              type: 'union',
              valueTypes: this.unions[value],
              nullable,
            };
          }

          console.log(this);

          // References
          return {
            type: 'reference',
            reference: value,
            nullable,
          };
      }
    }

    console.error('UNSUPPORTED ATTRIBUTE TYPE');
    console.log(field);

    return null;
  }

  extractEnum(definition) {
    const values = [];

    definition.values.forEach((value, i) => {
      this.enums[value.name.value] = values;
      values.push(i);
    });
  }

  extractShape(definition) {
    const attributes = {};

    definition.fields.forEach((field) => {
      attributes[field.name.value] = this.buildAttribute(field, field.type);
    });

    this.shapes[definition.name.value] = attributes;
  }

  extractUnion(definition) {
    const values = [];

    definition.types.forEach((type) => {
      values.push(this.buildAttribute(definition, type));
    });

    this.unions[definition.name.value] = values;
  }

  parseAttributes() {
    this.schematic.fields.forEach((fieldDefinition) => {
      this.attributes[fieldDefinition.name.value] = this.buildAttribute(
        fieldDefinition,
        fieldDefinition.type,
      );
    });
  }

  parseDefinitions() {
    this.schematic = this.document.definitions.pop();

    if (!this.schematic) {
      throw new SyntaxError('The schematic must be defined as the last GraphQL type.');

    } else if (this.schematic.kind !== Kind.OBJECT_TYPE_DEFINITION) {
      throw new TypeError('The schematic must be an object type.');
    }

    this.document.definitions.forEach((definition) => {
      switch (definition.kind) {
        case Kind.ENUM_TYPE_DEFINITION:
          this.extractEnum(definition);
          break;

        case Kind.OBJECT_TYPE_DEFINITION:
          this.extractShape(definition);
          break;

        case Kind.UNION_TYPE_DEFINITION:
          this.extractUnion(definition);
          break;

        default:
          console.error('UNKNOWN DEFINITION');
          console.log(definition);
          break;
      }
    });
  }

  toSchematic() {
    return {
      name: this.schematic.name.value,
      meta: {
        primaryKey: this.primaryKey || 'id',
      },
      attributes: this.attributes,
      references: this.references,
      shapes: this.shapes,
    };
  }
}

export default function readWithGraphQL(path: string): SchemaStructure {
  return new GraphQLReader(parse(fs.readFileSync(path, 'utf8'))).toSchematic();
}
