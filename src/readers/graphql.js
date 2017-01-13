/**
 * @copyright   2016, Miles Johnson
 * @license     https://opensource.org/licenses/MIT
 */

/* eslint-disable import/no-extraneous-dependencies, no-console */

import fs from 'fs';
import { parse, Kind } from 'graphql';

import type { SchemaStructure } from '../types';

function parseAttribute(field, nullable = false) {
  let attribute = {};

  // Named
  if (field.kind === Kind.NAMED_TYPE) {
    switch (field.name.value) {
      case 'Int':
      case 'Float':
      case 'String':
      case 'Boolean':
        attribute = {
          type: field.name.value.toLowerCase(),
          null: nullable,
        };
        break;

      default:
        console.log('UNSUPPORTED NAMED TYPE', field);
        break;
    }
  // Unnamed
  } else {
    console.log('UNSUPPORTED UNNAMED TYPE', field);
  }

  return attribute;
}

export default function readWithGraphQL(path: string): SchemaStructure {
  const document = parse(fs.readFileSync(path, 'utf8'));
  const schematic = {};

  // There should be 1 definition per file
  if (document.definitions.length !== 1) {
    throw new SyntaxError('There must be one GraphQL type definition per file.');
  }

  const definition = document.definitions[0];

  // Name
  schematic.name = definition.name.value;

  // Attributes
  schematic.references = {};
  schematic.attributes = {};

  definition.fields.forEach((fieldDefinition) => {
    let field = fieldDefinition.type;
    let nullable = true;

    // Non-null is nested another depth
    if (fieldDefinition.type.kind === Kind.NON_NULL_TYPE) {
      field = fieldDefinition.type.type;
      nullable = false;
    }

    schematic.attributes[fieldDefinition.name.value] = parseAttribute(field, nullable);
  });

  console.log(Kind, schematic);

  return schematic;
}
