import FlowRenderer from '../../src/renderers/Flow';
import Schematic from '../../src/Schematic';
import ArrayDefinition from '../../src/definitions/Array';
import BoolDefinition from '../../src/definitions/Bool';
import EnumDefinition from '../../src/definitions/Enum';
import FuncDefinition from '../../src/definitions/Func';
import InstanceDefinition from '../../src/definitions/Instance';
import NumberDefinition from '../../src/definitions/Number';
import ObjectDefinition from '../../src/definitions/Object';
import ReferenceDefinition from '../../src/definitions/Reference';
import StringDefinition from '../../src/definitions/String';
import UnionDefinition from '../../src/definitions/Union';
import { options } from '../mocks';

describe('FlowRenderer', () => {
  let renderer;

  beforeEach(() => {
    renderer = new FlowRenderer(options, new Schematic('/foo.json', {
      name: 'Foo',
      attributes: { id: 'number' },
    }, options));
  });

  describe('afterParse()', () => {
    it('adds flow comment', () => {
      renderer.afterParse();

      expect(renderer.imports).toEqual(['// @flow']);
    });
  });

  describe('renderArray()', () => {
    it('renders nullable', () => {
      expect(renderer.renderArray(new ArrayDefinition(options, 'foo', {
        null: true,
        valueType: 'string',
      }))).toBe('?string[]');
    });

    it('renders non-nullable', () => {
      expect(renderer.renderArray(new ArrayDefinition(options, 'foo', {
        valueType: 'string',
      }))).toBe('string[]');
    });

    it('handles non-primitive', () => {
      expect(renderer.renderArray(new ArrayDefinition(options, 'foo', {
        valueType: {
          type: 'object',
          valueType: 'string',
        },
      }))).toBe('Array<{ [key: string]: string }>');
    });

    it('handles instance ofs', () => {
      expect(renderer.renderArray(new ArrayDefinition(options, 'foo', {
        valueType: {
          type: 'instance',
          contract: 'FooBar',
        },
      }))).toBe('FooBar[]');
    });
  });

  describe('renderBool()', () => {
    it('renders nullable', () => {
      expect(renderer.renderBool(new BoolDefinition(options, 'foo', {
        null: true,
      }))).toBe('?boolean');
    });

    it('renders non-nullable', () => {
      expect(renderer.renderBool(new BoolDefinition(options, 'foo'))).toBe('boolean');
    });
  });

  describe('renderEnum()', () => {
    it('renders', () => {
      expect(renderer.renderEnum(new EnumDefinition(options, 'foo', {
        valueType: 'number',
        values: [1, 23, 164],
      }))).toBe('1 | 23 | 164');
    });
  });

  describe('renderFunc()', () => {
    it('renders nullable', () => {
      expect(renderer.renderFunc(new FuncDefinition(options, 'foo', {
        null: true,
      }))).toBe('?() => void');
    });

    it('renders non-nullable', () => {
      expect(renderer.renderFunc(new FuncDefinition(options, 'foo'))).toBe('() => void');
    });

    it('handles return type', () => {
      expect(renderer.renderFunc(new FuncDefinition(options, 'foo', {
        returnType: 'string',
      }))).toBe('() => string');
    });

    it('handles argument types', () => {
      expect(renderer.renderFunc(new FuncDefinition(options, 'foo', {
        returnType: 'string',
        argTypes: [
          'string',
          {
            type: 'array',
            valueType: 'number',
          },
        ],
      }))).toBe('(arg0: string, arg1: number[]) => string');
    });
  });

  describe('renderInstance()', () => {
    it('renders nullable', () => {
      expect(renderer.renderInstance(new InstanceDefinition(options, 'foo', {
        null: true,
        contract: 'FooBar',
      }))).toBe('?FooBar');
    });

    it('renders non-nullable', () => {
      expect(renderer.renderInstance(new InstanceDefinition(options, 'foo', {
        contract: 'FooBar',
      }))).toBe('FooBar');
    });
  });

  describe('renderNumber()', () => {
    it('renders nullable', () => {
      expect(renderer.renderNumber(new NumberDefinition(options, 'foo', {
        null: true,
      }))).toBe('?number');
    });

    it('renders non-nullable', () => {
      expect(renderer.renderNumber(new NumberDefinition(options, 'foo'))).toBe('number');
    });
  });

  describe('renderObject()', () => {
    it('renders nullable', () => {
      expect(renderer.renderObject(new ObjectDefinition(options, 'foo', {
        null: true,
        valueType: 'number',
      }))).toBe('?{ [key: string]: number }');
    });

    it('renders non-nullable', () => {
      expect(renderer.renderObject(new ObjectDefinition(options, 'foo', {
        valueType: 'number',
      }))).toBe('{ [key: string]: number }');
    });

    it('handles key type', () => {
      expect(renderer.renderObject(new ObjectDefinition(options, 'foo', {
        keyType: 'number',
        valueType: {
          type: 'array',
          valueType: 'string',
        },
      }))).toBe('{ [key: number]: string[] }');
    });
  });

  describe('renderReference()', () => {
    it('renders nullable', () => {
      expect(renderer.renderReference(new ReferenceDefinition(options, 'foo', {
        null: true,
        self: true,
      }))).toBe('?FooType');
    });

    it('renders non-nullable', () => {
      expect(renderer.renderReference(new ReferenceDefinition(options, 'foo', {
        self: true,
      }))).toBe('FooType');
    });
  });

  describe('renderString()', () => {
    it('renders nullable', () => {
      expect(renderer.renderString(new StringDefinition(options, 'foo', {
        null: true,
      }))).toBe('?string');
    });

    it('renders non-nullable', () => {
      expect(renderer.renderString(new StringDefinition(options, 'foo'))).toBe('string');
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
      expect(renderer.renderUnion(new UnionDefinition(options, 'foo', {
        null: true,
        valueTypes,
      }))).toBe('string | boolean | number[]');
    });

    it('renders non-nullable', () => {
      expect(renderer.renderUnion(new UnionDefinition(options, 'foo', {
        valueTypes,
      }))).toBe('string | boolean | number[]');
    });

    it('handles nested unions', () => {
      valueTypes.push({
        type: 'union',
        valueTypes: [
          {
            type: 'instance',
            contract: 'FooBar',
          },
        ],
      });

      expect(renderer.renderUnion(new UnionDefinition(options, 'foo', {
        valueTypes,
      }))).toBe('string | boolean | number[] | FooBar');
    });
  });

  describe('wrapNullable()', () => {
    it('renders nullable', () => {
      expect(renderer.wrapNullable({ isNullable: () => true }, 'foo')).toBe('?foo');
    });

    it('renders non-nullable', () => {
      expect(renderer.wrapNullable({}, 'foo')).toBe('foo');
    });
  });
});
