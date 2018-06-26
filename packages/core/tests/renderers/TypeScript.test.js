import Builder from '../../src/Builder';
import ArrayDefinition from '../../src/definitions/Array';
import BoolDefinition from '../../src/definitions/Bool';
import EnumDefinition from '../../src/definitions/Enum';
import InstanceDefinition from '../../src/definitions/Instance';
import KeyDefinition from '../../src/definitions/Key';
import NumberDefinition from '../../src/definitions/Number';
import ObjectDefinition from '../../src/definitions/Object';
import ReferenceDefinition from '../../src/definitions/Reference';
import Schematic from '../../src/Schematic';
import StringDefinition from '../../src/definitions/String';
import TypeScriptRenderer from '../../src/renderers/TypeScript';
import UnionDefinition from '../../src/definitions/Union';
import { options } from '../../../../tests/mocks';

describe('TypeScriptRenderer', () => {
  let renderer;

  beforeEach(() => {
    renderer = new TypeScriptRenderer(
      {
        ...options,
        renderers: ['typescript'],
      },
      new Builder(),
      new Schematic(
        '/foo.json',
        {
          name: 'Foo',
          attributes: { id: 'number' },
        },
        options,
      ),
    );
  });

  describe('beforeParse()', () => {
    it('does not change suffix if not inferring', () => {
      renderer.beforeParse();

      expect(renderer.suffix).toBe('Interface');
    });

    it('does not change suffix if no prop types', () => {
      renderer.options.inferPropTypesShape = true;
      renderer.beforeParse();

      expect(renderer.suffix).toBe('Interface');
    });

    it('changes suffix if inferring prop types', () => {
      renderer.options.inferPropTypesShape = true;
      renderer.options.renderers.push('prop-types');
      renderer.beforeParse();

      expect(renderer.suffix).toBe('Shape');
    });
  });

  describe('renderArray()', () => {
    it('renders nullable', () => {
      expect(
        renderer.renderArray(
          new ArrayDefinition(options, 'foo', {
            nullable: true,
            valueType: 'string',
          }),
        ),
      ).toBe('Array<string> | null');
    });

    it('renders non-nullable', () => {
      expect(
        renderer.renderArray(
          new ArrayDefinition(options, 'foo', {
            nullable: false,
            valueType: {
              type: 'string',
              nullable: false,
            },
          }),
        ),
      ).toBe('Array<string>');
    });

    it('handles non-primitive', () => {
      expect(
        renderer.renderArray(
          new ArrayDefinition(options, 'foo', {
            valueType: {
              type: 'object',
              valueType: 'string',
            },
          }),
        ),
      ).toBe('Array<{ [key: string]: string }>');
    });

    it('handles instance ofs', () => {
      expect(
        renderer.renderArray(
          new ArrayDefinition(options, 'foo', {
            valueType: {
              type: 'instance',
              contract: 'FooBar',
            },
          }),
        ),
      ).toBe('Array<FooBar>');
    });
  });

  describe('renderBool()', () => {
    it('renders nullable', () => {
      expect(
        renderer.renderBool(
          new BoolDefinition(options, 'foo', {
            nullable: true,
          }),
        ),
      ).toBe('boolean | null');
    });

    it('renders non-nullable', () => {
      expect(
        renderer.renderBool(
          new BoolDefinition(options, 'foo', {
            nullable: false,
          }),
        ),
      ).toBe('boolean');
    });
  });

  describe('renderEnum()', () => {
    it('renders', () => {
      expect(
        renderer.renderEnum(
          new EnumDefinition(options, 'bar', {
            valueType: 'number',
            values: [1, 23, 164],
          }),
        ),
      ).toBe('FooBarEnum');
    });
  });

  describe('renderInstance()', () => {
    it('renders nullable', () => {
      expect(
        renderer.renderInstance(
          new InstanceDefinition(options, 'foo', {
            nullable: true,
            contract: 'FooBar',
          }),
        ),
      ).toBe('FooBar | null');
    });

    it('renders non-nullable', () => {
      expect(
        renderer.renderInstance(
          new InstanceDefinition(options, 'foo', {
            nullable: false,
            contract: 'FooBar',
          }),
        ),
      ).toBe('FooBar');
    });
  });

  describe('renderKey()', () => {
    it('renders nullable', () => {
      expect(
        renderer.renderKey(
          new KeyDefinition(options, 'foo', {
            nullable: true,
          }),
        ),
      ).toBe('Key | null');

      expect(Array.from(renderer.builder.header)).toEqual(['export type Key = string | number;']);
    });

    it('renders non-nullable', () => {
      expect(
        renderer.renderKey(
          new KeyDefinition(options, 'foo', {
            nullable: false,
          }),
        ),
      ).toBe('Key');

      expect(Array.from(renderer.builder.header)).toEqual(['export type Key = string | number;']);
    });
  });

  describe('renderNumber()', () => {
    it('renders nullable', () => {
      expect(
        renderer.renderNumber(
          new NumberDefinition(options, 'foo', {
            nullable: true,
          }),
        ),
      ).toBe('number | null');
    });

    it('renders non-nullable', () => {
      expect(
        renderer.renderNumber(
          new NumberDefinition(options, 'foo', {
            nullable: false,
          }),
        ),
      ).toBe('number');
    });
  });

  describe('renderObject()', () => {
    it('renders nullable', () => {
      expect(
        renderer.renderObject(
          new ObjectDefinition(options, 'foo', {
            nullable: true,
            valueType: 'number',
          }),
        ),
      ).toBe('{ [key: string]: number } | null');
    });

    it('renders non-nullable', () => {
      expect(
        renderer.renderObject(
          new ObjectDefinition(options, 'foo', {
            nullable: false,
            valueType: 'number',
          }),
        ),
      ).toBe('{ [key: string]: number }');
    });

    it('handles key type', () => {
      expect(
        renderer.renderObject(
          new ObjectDefinition(options, 'foo', {
            keyType: 'number',
            valueType: {
              type: 'array',
              valueType: 'string',
            },
          }),
        ),
      ).toBe('{ [key: number]: Array<string> }');
    });
  });

  describe('renderReference()', () => {
    it('renders nullable', () => {
      expect(
        renderer.renderReference(
          new ReferenceDefinition(options, 'foo', {
            nullable: true,
            self: true,
          }),
        ),
      ).toBe('FooInterface | null');
    });

    it('renders non-nullable', () => {
      expect(
        renderer.renderReference(
          new ReferenceDefinition(options, 'foo', {
            nullable: false,
            self: true,
          }),
        ),
      ).toBe('FooInterface');
    });
  });

  describe('renderSchema()', () => {
    it('renders with generics', () => {
      renderer.options.schemaGenerics = true;

      expect(
        renderer.renderSchema('QuxSchema', [], {
          resourceName: 'quxs',
        }),
      ).toBe("export const quxSchema = new Schema<QuxInterface>('quxs');");
    });
  });

  describe('renderString()', () => {
    it('renders nullable', () => {
      expect(
        renderer.renderString(
          new StringDefinition(options, 'foo', {
            nullable: true,
          }),
        ),
      ).toBe('string | null');
    });

    it('renders non-nullable', () => {
      expect(
        renderer.renderString(
          new StringDefinition(options, 'foo', {
            nullable: false,
          }),
        ),
      ).toBe('string');
    });
  });

  describe('renderUnion()', () => {
    const valueTypes = [
      'string',
      { type: 'bool' },
      {
        type: 'array',
        valueType: 'number',
      },
    ];

    it('renders nullable', () => {
      expect(
        renderer.renderUnion(
          new UnionDefinition(options, 'foo', {
            nullable: true,
            valueTypes,
          }),
        ),
      ).toBe('string | boolean | Array<number> | null');
    });

    it('renders non-nullable', () => {
      expect(
        renderer.renderUnion(
          new UnionDefinition(options, 'foo', {
            nullable: false,
            valueTypes,
          }),
        ),
      ).toBe('string | boolean | Array<number>');
    });

    it('handles nested unions', () => {
      expect(
        renderer.renderUnion(
          new UnionDefinition(options, 'foo', {
            valueTypes: [
              ...valueTypes,
              {
                type: 'union',
                valueTypes: [
                  {
                    type: 'instance',
                    contract: 'FooBar',
                  },
                ],
              },
            ],
          }),
        ),
      ).toBe('string | boolean | Array<number> | FooBar');
    });
  });

  describe('wrapNullable()', () => {
    it('renders nullable', () => {
      expect(renderer.wrapNullable({ isNullable: () => true }, 'foo')).toBe('foo | null');
    });

    it('renders non-nullable', () => {
      expect(renderer.wrapNullable({ isNullable: () => false }, 'foo')).toBe('foo');
    });
  });
});
