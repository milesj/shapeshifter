import { expect } from 'chai';
import ReactRenderer from '../../src/renderers/React';
import SchemaReader from '../../src/SchemaReader';
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

describe('ReactRenderer', () => {
  let renderer;

  beforeEach(() => {
    renderer = new ReactRenderer(options, new SchemaReader('/foo.json', {
      name: 'Foo',
      attributes: { id: 'number' },
    }, options));
  });

  describe('beforeParse()', () => {
    it('adds React import', () => {
      renderer.beforeParse();

      expect(renderer.imports).to.deep.equal(['import { PropTypes } from \'react\';']);
    });
  });

  describe('renderArray()', () => {
    it('renders required', () => {
      expect(renderer.renderArray(new ArrayDefinition(options, 'foo', {
        required: true,
        valueType: 'string',
      }))).to.equal('PropTypes.arrayOf(PropTypes.string).isRequired');
    });

    it('renders non-required', () => {
      expect(renderer.renderArray(new ArrayDefinition(options, 'foo', {
        valueType: 'string',
      }))).to.equal('PropTypes.arrayOf(PropTypes.string)');
    });

    it('handles non-primitive', () => {
      expect(renderer.renderArray(new ArrayDefinition(options, 'foo', {
        valueType: {
          type: 'object',
          valueType: 'string',
        },
      }))).to.equal('PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string))');
    });

    it('handles instance ofs', () => {
      expect(renderer.renderArray(new ArrayDefinition(options, 'foo', {
        valueType: {
          type: 'instance',
          contract: 'FooBar',
        },
      }))).to.equal('PropTypes.arrayOf(PropTypes.instanceOf(FooBar))');
    });
  });

  describe('renderBool()', () => {
    it('renders required', () => {
      expect(renderer.renderBool(new BoolDefinition(options, 'foo', {
        required: true,
      }))).to.equal('PropTypes.bool.isRequired');
    });

    it('renders non-required', () => {
      expect(renderer.renderBool(new BoolDefinition(options, 'foo'))).to.equal('PropTypes.bool');
    });
  });

  describe('renderEnum()', () => {
    it('renders required', () => {
      expect(renderer.renderEnum(new EnumDefinition(options, 'foo', {
        required: true,
        valueType: 'number',
        values: [1, 23, 164],
      }))).to.equal(`PropTypes.oneOf([
1,
23,
164,
]).isRequired`);
    });

    it('renders non-required', () => {
      expect(renderer.renderEnum(new EnumDefinition(options, 'foo', {
        valueType: 'number',
        values: [1, 23, 164],
      }))).to.equal(`PropTypes.oneOf([
1,
23,
164,
])`);
    });
  });

  describe('renderFunc()', () => {
    it('renders required', () => {
      expect(renderer.renderFunc(new FuncDefinition(options, 'foo', {
        required: true,
      }))).to.equal('PropTypes.func.isRequired');
    });

    it('renders non-required', () => {
      expect(renderer.renderFunc(new FuncDefinition(options, 'foo'))).to.equal('PropTypes.func');
    });
  });

  describe('renderInstance()', () => {
    it('renders required', () => {
      expect(renderer.renderInstance(new InstanceDefinition(options, 'foo', {
        required: true,
        contract: 'FooBar',
      }))).to.equal('PropTypes.instanceOf(FooBar).isRequired');
    });

    it('renders non-required', () => {
      expect(renderer.renderInstance(new InstanceDefinition(options, 'foo', {
        contract: 'FooBar',
      }))).to.equal('PropTypes.instanceOf(FooBar)');
    });
  });

  describe('renderNumber()', () => {
    it('renders required', () => {
      expect(renderer.renderNumber(new NumberDefinition(options, 'foo', {
        required: true,
      }))).to.equal('PropTypes.number.isRequired');
    });

    it('renders non-required', () => {
      expect(renderer.renderNumber(new NumberDefinition(options, 'foo'))).to.equal('PropTypes.number');
    });
  });

  describe('renderObject()', () => {
    it('renders required', () => {
      expect(renderer.renderObject(new ObjectDefinition(options, 'foo', {
        required: true,
        valueType: 'number',
      }))).to.equal('PropTypes.objectOf(PropTypes.number).isRequired');
    });

    it('renders non-required', () => {
      expect(renderer.renderObject(new ObjectDefinition(options, 'foo', {
        valueType: 'number',
      }))).to.equal('PropTypes.objectOf(PropTypes.number)');
    });
  });

  describe('renderReference()', () => {
    it('renders required', () => {
      expect(renderer.renderReference(new ReferenceDefinition(options, 'foo', {
        required: true,
        self: true,
      }))).to.equal('(...args) => FooShape(...args).isRequired');
    });

    it('renders non-required', () => {
      expect(renderer.renderReference(new ReferenceDefinition(options, 'foo', {
        self: true,
      }))).to.equal('(...args) => FooShape(...args)');
    });
  });

  describe('renderString()', () => {
    it('renders required', () => {
      expect(renderer.renderString(new StringDefinition(options, 'foo', {
        required: true,
      }))).to.equal('PropTypes.string.isRequired');
    });

    it('renders non-required', () => {
      expect(renderer.renderString(new StringDefinition(options, 'foo'))).to.equal('PropTypes.string');
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
      }))).to.equal(`PropTypes.oneOfType([
PropTypes.string,
PropTypes.bool,
PropTypes.arrayOf(PropTypes.number),
]).isRequired`);
    });

    it('renders non-required', () => {
      expect(renderer.renderUnion(new UnionDefinition(options, 'foo', {
        valueTypes,
      }))).to.equal(`PropTypes.oneOfType([
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
      }))).to.equal(`PropTypes.oneOfType([
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
      expect(renderer.wrapPropType({}, 'foo')).to.equal('PropTypes.foo');
    });
  });

  describe('wrapRequired()', () => {
    it('renders required', () => {
      expect(renderer.wrapRequired({ isRequired: () => true }, 'foo')).to.equal('foo.isRequired');
    });

    it('renders non-required', () => {
      expect(renderer.wrapRequired({}, 'foo')).to.equal('foo');
    });
  });
});
