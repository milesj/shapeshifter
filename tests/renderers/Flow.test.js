import { expect } from 'chai';
import FlowRenderer from '../../lib/renderers/Flow';
import SchemaReader from '../../lib/SchemaReader';
import ArrayDefinition from '../../lib/definitions/Array';
import BoolDefinition from '../../lib/definitions/Bool';
import EnumDefinition from '../../lib/definitions/Enum';
import FuncDefinition from '../../lib/definitions/Func';
import InstanceDefinition from '../../lib/definitions/Instance';
import NumberDefinition from '../../lib/definitions/Number';
import ObjectDefinition from '../../lib/definitions/Object';
import ReferenceDefinition from '../../lib/definitions/Reference';
import StringDefinition from '../../lib/definitions/String';
import UnionDefinition from '../../lib/definitions/Union';
import { options } from '../mocks';

describe('FlowRenderer', () => {
  let renderer;

  beforeEach(() => {
    renderer = new FlowRenderer(options, new SchemaReader('/foo.json', {
      name: 'Foo',
      attributes: { id: 'number' },
    }, options));
  });

  describe('afterParse()', () => {
    it('adds flow comment', () => {
      renderer.afterParse();

      expect(renderer.imports).to.deep.equal(['// @flow']);
    });
  });

  describe('renderArray()', () => {
    it('renders nullable', () => {
      expect(renderer.renderArray(new ArrayDefinition(options, 'foo', {
        null: true,
        valueType: 'string',
      }))).to.equal('?string[]');
    });

    it('renders non-nullable', () => {
      expect(renderer.renderArray(new ArrayDefinition(options, 'foo', {
        valueType: 'string',
      }))).to.equal('string[]');
    });

    it('handles non-primitive', () => {
      expect(renderer.renderArray(new ArrayDefinition(options, 'foo', {
        valueType: {
          type: 'object',
          valueType: 'string',
        },
      }))).to.equal('Array<{ [key: string]: string }>');
    });

    it('handles instance ofs', () => {
      expect(renderer.renderArray(new ArrayDefinition(options, 'foo', {
        valueType: {
          type: 'instance',
          contract: 'FooBar',
        },
      }))).to.equal('FooBar[]');
    });
  });

  describe('renderBool()', () => {
    it('renders nullable', () => {
      expect(renderer.renderBool(new BoolDefinition(options, 'foo', {
        null: true,
      }))).to.equal('?boolean');
    });

    it('renders non-nullable', () => {
      expect(renderer.renderBool(new BoolDefinition(options, 'foo'))).to.equal('boolean');
    });
  });

  describe('renderEnum()', () => {
    it('renders', () => {
      expect(renderer.renderEnum(new EnumDefinition(options, 'foo', {
        valueType: 'number',
        values: [1, 23, 164],
      }))).to.equal('1 | 23 | 164');
    });
  });

  describe('renderFunc()', () => {
    it('renders nullable', () => {
      expect(renderer.renderFunc(new FuncDefinition(options, 'foo', {
        null: true,
      }))).to.equal('?() => void');
    });

    it('renders non-nullable', () => {
      expect(renderer.renderFunc(new FuncDefinition(options, 'foo'))).to.equal('() => void');
    });

    it('handles return type', () => {
      expect(renderer.renderFunc(new FuncDefinition(options, 'foo', {
        returnType: 'string',
      }))).to.equal('() => string');
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
      }))).to.equal('(arg0: string, arg1: number[]) => string');
    });
  });

  describe('renderInstance()', () => {
    it('renders nullable', () => {
      expect(renderer.renderInstance(new InstanceDefinition(options, 'foo', {
        null: true,
        contract: 'FooBar',
      }))).to.equal('?FooBar');
    });

    it('renders non-nullable', () => {
      expect(renderer.renderInstance(new InstanceDefinition(options, 'foo', {
        contract: 'FooBar',
      }))).to.equal('FooBar');
    });
  });

  describe('renderNumber()', () => {
    it('renders nullable', () => {
      expect(renderer.renderNumber(new NumberDefinition(options, 'foo', {
        null: true,
      }))).to.equal('?number');
    });

    it('renders non-nullable', () => {
      expect(renderer.renderNumber(new NumberDefinition(options, 'foo'))).to.equal('number');
    });
  });

  describe('renderObject()', () => {
    it('renders nullable', () => {
      expect(renderer.renderObject(new ObjectDefinition(options, 'foo', {
        null: true,
        valueType: 'number',
      }))).to.equal('?{ [key: string]: number }');
    });

    it('renders non-nullable', () => {
      expect(renderer.renderObject(new ObjectDefinition(options, 'foo', {
        valueType: 'number',
      }))).to.equal('{ [key: string]: number }');
    });

    it('handles key type', () => {
      expect(renderer.renderObject(new ObjectDefinition(options, 'foo', {
        keyType: 'number',
        valueType: {
          type: 'array',
          valueType: 'string',
        },
      }))).to.equal('{ [key: number]: string[] }');
    });
  });

  describe('renderReference()', () => {
    it('renders nullable', () => {
      expect(renderer.renderReference(new ReferenceDefinition(options, 'foo', {
        null: true,
        self: true,
      }))).to.equal('?FooType');
    });

    it('renders non-nullable', () => {
      expect(renderer.renderReference(new ReferenceDefinition(options, 'foo', {
        self: true,
      }))).to.equal('FooType');
    });
  });

  describe('renderString()', () => {
    it('renders nullable', () => {
      expect(renderer.renderString(new StringDefinition(options, 'foo', {
        null: true,
      }))).to.equal('?string');
    });

    it('renders non-nullable', () => {
      expect(renderer.renderString(new StringDefinition(options, 'foo'))).to.equal('string');
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
      }))).to.equal('string | boolean | number[]');
    });

    it('renders non-nullable', () => {
      expect(renderer.renderUnion(new UnionDefinition(options, 'foo', {
        valueTypes,
      }))).to.equal('string | boolean | number[]');
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
      }))).to.equal('string | boolean | number[] | FooBar');
    });
  });

  describe('wrapNullable()', () => {
    it('renders nullable', () => {
      expect(renderer.wrapNullable({ isNullable: () => true }, 'foo')).to.equal('?foo');
    });

    it('renders non-nullable', () => {
      expect(renderer.wrapNullable({}, 'foo')).to.equal('foo');
    });
  });
});
