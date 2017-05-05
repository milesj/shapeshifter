import ArrayDefinition from '../../src/definitions/Array';
import BoolDefinition from '../../src/definitions/Bool';
import EnumDefinition from '../../src/definitions/Enum';
import InstanceDefinition from '../../src/definitions/Instance';
import NumberDefinition from '../../src/definitions/Number';
import ObjectDefinition from '../../src/definitions/Object';
import ReactRenderer from '../../src/renderers/React';
import ReferenceDefinition from '../../src/definitions/Reference';
import Schematic from '../../src/Schematic';
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

      expect(renderer.imports).toEqual(['import PropTypes from \'prop-types\';']);
    });

    it('adds production noop when stripPropTypes is true', () => {
      const prodRenderer = new ReactRenderer({ ...options, stripPropTypes: true }, new Schematic('./foo.json', {
        name: 'Foo',
        attributes: { id: 'number' },
      }, options));

      prodRenderer.beforeParse();

      expect(prodRenderer.header).toEqual(['const PropTypePolyfill = () => {};']);
    });
  });

  describe('renderArray()', () => {
    it('renders required', () => {
      expect(renderer.renderArray(new ArrayDefinition(options, 'foo', {
        nullable: false,
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
        nullable: false,
      }))).toBe('PropTypes.bool.isRequired');
    });

    it('renders non-required', () => {
      expect(renderer.renderBool(new BoolDefinition(options, 'foo'))).toBe('PropTypes.bool');
    });
  });

  describe('renderEnum()', () => {
    it('renders required', () => {
      expect(renderer.renderEnum(new EnumDefinition(options, 'foo', {
        nullable: false,
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
        nullable: false,
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
        nullable: false,
      }))).toBe('PropTypes.number.isRequired');
    });

    it('renders non-required', () => {
      expect(renderer.renderNumber(new NumberDefinition(options, 'foo'))).toBe('PropTypes.number');
    });
  });

  describe('renderObject()', () => {
    it('renders required', () => {
      expect(renderer.renderObject(new ObjectDefinition(options, 'foo', {
        nullable: false,
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
        nullable: false,
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
        nullable: false,
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
        nullable: false,
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

  describe('wrapNullable()', () => {
    it('renders required', () => {
      expect(renderer.wrapNullable({ isNullable: () => false }, 'foo')).toBe('foo.isRequired');
    });

    it('renders non-required', () => {
      expect(renderer.wrapNullable({}, 'foo')).toBe('foo');
    });
  });
});
