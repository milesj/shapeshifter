import ReactRenderer from '../../src/renderers/React';
import Schematic from '../../src/Schematic';
import ArrayDefinition from '../../src/definitions/Array';
import BoolDefinition from '../../src/definitions/Bool';
import EnumDefinition from '../../src/definitions/Enum';
import InstanceDefinition from '../../src/definitions/Instance';
import NumberDefinition from '../../src/definitions/Number';
import ObjectDefinition from '../../src/definitions/Object';
import ReferenceDefinition from '../../src/definitions/Reference';
import StringDefinition from '../../src/definitions/String';
import UnionDefinition from '../../src/definitions/Union';
import { options } from '../mocks';

describe('ReactRenderer', () => {
  let renderer;

  beforeEach(() => {
    renderer = new ReactRenderer(options, new Schematic('/foo.json', {
      name: 'Foo',
      attributes: { id: 'number' },
    }, options));
  });

  describe('beforeParse()', () => {
    it('adds React import', () => {
      renderer.beforeParse();

      expect(renderer.imports).toEqual(['import { PropTypes } from \'react\';']);
    });
  });

  describe('renderArray()', () => {
    it('renders required', () => {
      expect(renderer.renderArray(new ArrayDefinition(options, 'foo', {
        required: true,
        valueType: 'string',
      }))).toBe('PropTypes.arrayOf(PropTypes.string).isRequired');
    });

    it('renders non-required', () => {
      expect(renderer.renderArray(new ArrayDefinition(options, 'foo', {
        valueType: 'string',
      }))).toBe('PropTypes.arrayOf(PropTypes.string)');
    });

    it('handles non-primitive', () => {
      expect(renderer.renderArray(new ArrayDefinition(options, 'foo', {
        valueType: {
          type: 'object',
          valueType: 'string',
        },
      }))).toBe('PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string))');
    });

    it('handles instance ofs', () => {
      expect(renderer.renderArray(new ArrayDefinition(options, 'foo', {
        valueType: {
          type: 'instance',
          contract: 'FooBar',
        },
      }))).toBe('PropTypes.arrayOf(PropTypes.instanceOf(FooBar))');
    });
  });

  describe('renderBool()', () => {
    it('renders required', () => {
      expect(renderer.renderBool(new BoolDefinition(options, 'foo', {
        required: true,
      }))).toBe('PropTypes.bool.isRequired');
    });

    it('renders non-required', () => {
      expect(renderer.renderBool(new BoolDefinition(options, 'foo'))).toBe('PropTypes.bool');
    });
  });

  describe('renderEnum()', () => {
    it('renders required', () => {
      expect(renderer.renderEnum(new EnumDefinition(options, 'foo', {
        required: true,
        valueType: 'number',
        values: [1, 23, 164],
      }))).toBe(`PropTypes.oneOf([
1,
23,
164,
]).isRequired`);
    });

    it('renders non-required', () => {
      expect(renderer.renderEnum(new EnumDefinition(options, 'foo', {
        valueType: 'number',
        values: [1, 23, 164],
      }))).toBe(`PropTypes.oneOf([
1,
23,
164,
])`);
    });
  });

  describe('renderInstance()', () => {
    it('renders required', () => {
      expect(renderer.renderInstance(new InstanceDefinition(options, 'foo', {
        required: true,
        contract: 'FooBar',
      }))).toBe('PropTypes.instanceOf(FooBar).isRequired');
    });

    it('renders non-required', () => {
      expect(renderer.renderInstance(new InstanceDefinition(options, 'foo', {
        contract: 'FooBar',
      }))).toBe('PropTypes.instanceOf(FooBar)');
    });
  });

  describe('renderNumber()', () => {
    it('renders required', () => {
      expect(renderer.renderNumber(new NumberDefinition(options, 'foo', {
        required: true,
      }))).toBe('PropTypes.number.isRequired');
    });

    it('renders non-required', () => {
      expect(renderer.renderNumber(new NumberDefinition(options, 'foo'))).toBe('PropTypes.number');
    });
  });

  describe('renderObject()', () => {
    it('renders required', () => {
      expect(renderer.renderObject(new ObjectDefinition(options, 'foo', {
        required: true,
        valueType: 'number',
      }))).toBe('PropTypes.objectOf(PropTypes.number).isRequired');
    });

    it('renders non-required', () => {
      expect(renderer.renderObject(new ObjectDefinition(options, 'foo', {
        valueType: 'number',
      }))).toBe('PropTypes.objectOf(PropTypes.number)');
    });
  });

  describe('renderReference()', () => {
    it('renders required', () => {
      expect(renderer.renderReference(new ReferenceDefinition(options, 'foo', {
        required: true,
        self: true,
      }))).toBe('(...args) => FooShape(...args).isRequired');
    });

    it('renders non-required', () => {
      expect(renderer.renderReference(new ReferenceDefinition(options, 'foo', {
        self: true,
      }))).toBe('(...args) => FooShape(...args)');
    });
  });

  describe('renderString()', () => {
    it('renders required', () => {
      expect(renderer.renderString(new StringDefinition(options, 'foo', {
        required: true,
      }))).toBe('PropTypes.string.isRequired');
    });

    it('renders non-required', () => {
      expect(renderer.renderString(new StringDefinition(options, 'foo'))).toBe('PropTypes.string');
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

    it('renders required', () => {
      expect(renderer.renderUnion(new UnionDefinition(options, 'foo', {
        required: true,
        valueTypes,
      }))).toBe(`PropTypes.oneOfType([
PropTypes.string,
PropTypes.bool,
PropTypes.arrayOf(PropTypes.number),
]).isRequired`);
    });

    it('renders non-required', () => {
      expect(renderer.renderUnion(new UnionDefinition(options, 'foo', {
        valueTypes,
      }))).toBe(`PropTypes.oneOfType([
PropTypes.string,
PropTypes.bool,
PropTypes.arrayOf(PropTypes.number),
])`);
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
      }))).toBe(`PropTypes.oneOfType([
PropTypes.string,
PropTypes.bool,
PropTypes.arrayOf(PropTypes.number),
PropTypes.oneOfType([
PropTypes.instanceOf(FooBar),
]),
])`);
    });
  });

  describe('wrapPropType()', () => {
    it('adds prop type text', () => {
      expect(renderer.wrapPropType({}, 'foo')).toBe('PropTypes.foo');
    });
  });

  describe('wrapRequired()', () => {
    it('renders required', () => {
      expect(renderer.wrapRequired({ isRequired: () => true }, 'foo')).toBe('foo.isRequired');
    });

    it('renders non-required', () => {
      expect(renderer.wrapRequired({}, 'foo')).toBe('foo');
    });
  });
});
