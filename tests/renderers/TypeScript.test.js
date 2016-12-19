import { expect } from 'chai';
import TypeScriptRenderer from '../../src/renderers/TypeScript';
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

describe('TypeScriptRenderer', () => {
  let renderer;

  beforeEach(() => {
    renderer = new TypeScriptRenderer(options, new SchemaReader('/foo.json', {
      name: 'Foo',
      attributes: { id: 'number' },
    }, options));
  });

  describe('renderArray()', () => {
    it('renders', () => {
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
    it('renders', () => {
      expect(renderer.renderBool(new BoolDefinition(options, 'foo'))).to.equal('boolean');
    });
  });

  describe('renderEnum()', () => {
    it('renders', () => {
      expect(renderer.renderEnum(new EnumDefinition(options, 'bar', {
        valueType: 'number',
        values: [1, 23, 164],
      }))).to.equal('FooBarEnum');
    });
  });

  describe('renderFunc()', () => {
    it('renders', () => {
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
          {
            type: 'string',
            required: true,
          },
          {
            type: 'array',
            valueType: 'number',
          },
        ],
      }))).to.equal('(arg0: string, arg1?: number[]) => string');
    });
  });

  describe('renderInstance()', () => {
    it('renders', () => {
      expect(renderer.renderInstance(new InstanceDefinition(options, 'foo', {
        contract: 'FooBar',
      }))).to.equal('FooBar');
    });
  });

  describe('renderNumber()', () => {
    it('renders', () => {
      expect(renderer.renderNumber(new NumberDefinition(options, 'foo'))).to.equal('number');
    });
  });

  describe('renderObject()', () => {
    it('renders', () => {
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
    it('renders', () => {
      expect(renderer.renderReference(new ReferenceDefinition(options, 'foo', {
        self: true,
      }))).to.equal('FooInterface');
    });
  });

  describe('renderString()', () => {
    it('renders', () => {
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

    it('renders', () => {
      expect(renderer.renderUnion(new UnionDefinition(options, 'foo', {
        valueTypes,
      }))).to.equal('string | boolean | number[]');
    });

    it('handles nested unions', () => {
      expect(renderer.renderUnion(new UnionDefinition(options, 'foo', {
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
      }))).to.equal('string | boolean | number[] | FooBar');
    });

    it('handles functions', () => {
      expect(renderer.renderUnion(new UnionDefinition(options, 'foo', {
        valueTypes: [
          ...valueTypes,
          {
            type: 'function',
            returnType: 'string',
          },
        ],
      }))).to.equal('string | boolean | number[] | (() => string)');
    });
  });

  describe('wrapPropertyName()', () => {
    it('renders required', () => {
      expect(renderer.wrapPropertyName({ attribute: 'foo', isRequired: () => true })).to.equal('foo');
    });

    it('renders non-required', () => {
      expect(renderer.wrapPropertyName({ attribute: 'foo', isRequired: () => false })).to.equal('foo?');
    });
  });
});
