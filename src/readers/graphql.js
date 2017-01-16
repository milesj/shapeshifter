/**
 * @copyright   2016, Miles Johnson
 * @license     https://opensource.org/licenses/MIT
 * @flow
 */

/* eslint-disable import/no-extraneous-dependencies, no-console */

import fs from 'fs';
import { extname } from 'path';
import { parse, Kind } from 'graphql';

import type {
  DocumentNode,
  DefinitionNode,
  TypeDefinitionNode,
  EnumValueDefinitionNode,
  FieldDefinitionNode,
  NamedTypeNode,
} from 'graphql';
import type {
  SchemaStructure,
  TypeDefinition,
  AttributesField,
  ReferencesField,
  ShapesField,
} from '../types';

class GraphQLReader {
  document: DocumentNode = null;
  schematic: DefinitionNode = null;
  fileExt: string = '';
  name: string = '';
  primaryKey: string = '';
  attributes: AttributesField = {};
  references: ReferencesField = {};
  enums: { [key: string]: number[] } = {};
  shapes: ShapesField = {};
  unions: { [key: string]: TypeDefinition[] } = {};

  constructor(doc: DocumentNode, ext: string) {
    this.document = doc;
    this.fileExt = ext;

    this.parseDefinitions();
    this.parseAttributes();
  }

  buildAttribute(
    field: DefinitionNode,
    type: TypeDefinitionNode,
    nullable: boolean = true,
    schematic: boolean = false,
  ): TypeDefinition {
    // Non-nullable
    if (type.kind === Kind.NON_NULL_TYPE) {
      return this.buildAttribute(field, type.type, false, schematic);

    // List
    } else if (type.kind === Kind.LIST_TYPE) {
      // $FlowIssue We know what this will be
      return {
        type: 'array',
        valueType: this.buildAttribute(field, type.type, true, schematic),
        nullable,
      };

    // Named
    } else if (type.kind === Kind.NAMED_TYPE) {
      const value = type.name.value;

      switch (value) {
        case 'ID':
          if (schematic) {
            if (this.primaryKey) {
              /* istanbul ignore next Hard to test */
              throw new SyntaxError(`A primary key for ${this.name} has already been defined.`);
            }

            this.primaryKey = field.name.value;
          }

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

          // References
          this.references[value] = `./${value}${this.fileExt}`;

          return {
            type: 'reference',
            reference: value,
            nullable,
          };
      }
    }

    /* istanbul ignore next No need to cover */
    throw new TypeError(`Unsupported GraphQL attribute type "${field.name.value}".`);
  }

  extractEnum(definition: DefinitionNode) {
    const values = [];

    definition.values.forEach((value: EnumValueDefinitionNode, i: number) => {
      this.enums[value.name.value] = values;
      values.push(i);
    });
  }

  extractShape(definition: DefinitionNode) {
    const attributes = {};

    definition.fields.forEach((field: FieldDefinitionNode) => {
      attributes[field.name.value] = this.buildAttribute(field, field.type);
    });

    this.shapes[definition.name.value] = attributes;
  }

  extractUnion(definition: DefinitionNode) {
    const values = [];

    definition.types.forEach((type: NamedTypeNode) => {
      values.push(this.buildAttribute(definition, type));
    });

    this.unions[definition.name.value] = values;
  }

  parseAttributes() {
    this.schematic.fields.forEach((fieldDefinition: DefinitionNode) => {
      this.attributes[fieldDefinition.name.value] = this.buildAttribute(
        fieldDefinition,
        fieldDefinition.type,
        true,
        true,
      );
    });
  }

  parseDefinitions() {
    this.schematic = this.document.definitions.pop();

    if (!this.schematic) {
      /* istanbul ignore next No need to cover */
      throw new SyntaxError('The schematic must be defined as the last GraphQL type.');

    } else if (this.schematic.kind !== Kind.OBJECT_TYPE_DEFINITION) {
      /* istanbul ignore next No need to cover */
      throw new TypeError('The schematic must be an object type.');
    }

    this.name = this.schematic.name.value;

    this.document.definitions.forEach((definition: DefinitionNode) => {
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

        case Kind.INTERFACE_TYPE_DEFINITION:
          // Ignore interfaces
          break;

        default:
          /* istanbul ignore next No need to cover */
          throw new TypeError(`Unsupported GraphQL definition "${definition.name.value}".`);
      }
    });
  }

  toSchematic(): SchemaStructure {
    return {
      name: this.name,
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
  return new GraphQLReader(
    parse(fs.readFileSync(path, 'utf8')),
    extname(path),
  ).toSchematic();
}
