import { expect } from 'chai';
import Renderer from '../lib/Renderer';
import SchemaReader from '../lib/SchemaReader';
import ArrayDefinition from '../lib/definitions/Array';
import StringDefinition from '../lib/definitions/String';
import ReferenceDefinition from '../lib/definitions/Reference';
import { options } from './mocks';

describe('Renderer', () => {
  let renderer;

  beforeEach(() => {
    renderer = new Renderer(options, new SchemaReader('/foo.json', {
      name: 'foo Bar-Baz',
      attributes: { foo: 'string' },
    }, options));
  });

  describe('formatArray()', () => {
    it('formats a string into brackets', () => {
      expect(renderer.formatArray(123, 0)).to.equal('[\n123\n]');
    });

    it('formats an array by joining', () => {
      expect(renderer.formatArray([123, 456], 0)).to.equal('[\n123\n456\n]');
      expect(renderer.formatArray([123, 456], 0, ',')).to.equal('[\n123,456\n]');
    });

    it('customizes the spacer characters', () => {
      expect(renderer.formatArray([123, 456], 0, ',', '   ')).to.equal('[   123,456   ]');
    });

    it('customizes the indentation', () => {
      expect(renderer.formatArray([123, 456], 3)).to.equal('[\n123\n456\n      ]');
    });
  });

  describe('formatObject()', () => {
    it('formats a string into brackets', () => {
      expect(renderer.formatObject(123, 0)).to.equal('{\n123\n}');
    });

    it('formats an array by joining', () => {
      expect(renderer.formatObject([123, 456], 0)).to.equal('{\n123\n456\n}');
      expect(renderer.formatObject([123, 456], 0, ',')).to.equal('{\n123,456\n}');
    });

    it('customizes the spacer characters', () => {
      expect(renderer.formatObject([123, 456], 0, ',', '   ')).to.equal('{   123,456   }');
    });

    it('customizes the indentation', () => {
      expect(renderer.formatObject([123, 456], 3)).to.equal('{\n123\n456\n      }');
    });
  });

  describe('formatValue()', () => {
    it('wraps strings in quotes', () => {
      expect(renderer.formatValue('foo')).to.equal('\'foo\'');
      expect(renderer.formatValue('foo', 'string')).to.equal('\'foo\'');
    });

    it('passes functions and booleans as is', () => {
      expect(renderer.formatValue('functionName', 'function')).to.equal('functionName');
      expect(renderer.formatValue(true, 'bool')).to.equal('true');
      expect(renderer.formatValue(false)).to.equal('false');
    });

    it('parses and passes numbers as is', () => {
      expect(renderer.formatValue(123)).to.equal('123');
      expect(renderer.formatValue(123.45, 'number')).to.equal('123.45');
      expect(renderer.formatValue('asds', 'number')).to.equal('NaN');
    });

    it('errors on invalid types', () => {
      expect(() => (
        renderer.formatValue('foo', 'what')
      )).to.throw(TypeError, 'Unknown type "what" passed to formatValue().');
    });
  });

  describe('getObjectName()', () => {
    it('camel cases the name', () => {
      expect(renderer.getObjectName('foo_bar', 'baz')).to.equal('FooBarBaz');
    });

    it('can append the suffix', () => {
      expect(renderer.getObjectName('foo', 'bar', 'Schema')).to.equal('FooBarSchema');
    });
  });

  describe('renderConstant()', () => {
    it('renders primitive values', () => {
      expect(renderer.renderConstant('FOO', 'bar')).to.equal('export const FOO = \'bar\';');
      expect(renderer.renderConstant('FOO', 123)).to.equal('export const FOO = 123;');
      expect(renderer.renderConstant('FOO', 456.78)).to.equal('export const FOO = 456.78;');
      expect(renderer.renderConstant('FOO', true)).to.equal('export const FOO = true;');
      expect(renderer.renderConstant('FOO', false)).to.equal('export const FOO = false;');
    });

    it('renders an array of primitive values', () => {
      expect(renderer.renderConstant('FOO', [
        'bar', 123, 456.78, true,
      ])).to.equal('export const FOO = [\'bar\', 123, 456.78, true];');
    });
  });

  describe('renderImport()', () => {
    it('errors if no `path` is set', () => {
      expect(() => renderer.renderImport({})).to.throw(SyntaxError, 'Import statements require a file path.');
    });

    it('errors if `named` is not an array', () => {
      expect(() => (
        renderer.renderImport({ path: '/', named: true })
      )).to.throw(TypeError, 'Named imports must be an array.');
    });

    it('errors if no named or default imports', () => {
      expect(() => (
        renderer.renderImport({ path: '/', named: [] })
      )).to.throw(Error, 'Import statements require either a default export or named exports.');
    });

    it('renders a default import', () => {
      expect(renderer.renderImport({
        path: '/',
        default: 'DefaultName',
      })).to.equal('import DefaultName from \'/\';');
    });

    it('renders named imports', () => {
      expect(renderer.renderImport({
        path: '/',
        named: ['foo', 'bar'],
      })).to.equal('import { foo, bar } from \'/\';');
    });

    it('renders a default and named imports', () => {
      expect(renderer.renderImport({
        path: '/',
        default: 'DefaultName',
        named: ['foo', 'bar'],
      })).to.equal('import DefaultName, { foo, bar } from \'/\';');
    });
  });

  describe('renderSchema()', () => {
    it('errors if no resource name', () => {
      expect(() => renderer.renderSchema('QuxSchema', [], {})).to.throw(SyntaxError);
    });

    it('errors if invalud resource name', () => {
      expect(() => renderer.renderSchema('QuxSchema', [], { resourceName: true })).to.throw(SyntaxError);
    });

    it('renders template', () => {
      expect(renderer.renderSchema('QuxSchema', [], {
        resourceName: 'quxs',
      })).to.equal('export const QuxSchema = new Schema(\'quxs\');');
    });

    it('renders template with primary key', () => {
      expect(renderer.renderSchema('QuxSchema', [], {
        resourceName: 'quxs',
        primaryKey: 'uuid',
      })).to.equal('export const QuxSchema = new Schema(\'quxs\', \'uuid\');');
    });

    it('renders template with attributes', () => {
      renderer.options.includeAttributes = true;

      expect(renderer.renderSchema('QuxSchema', [
        new StringDefinition(options, 'first_name'),
        new StringDefinition(options, 'last_name'),
      ], {
        resourceName: 'quxs',
      })).to.equal('export const QuxSchema = new Schema(\'quxs\');');

      expect(renderer.relations).to.deep.equal([
        `QuxSchema.addAttributes([
  'first_name',
  'last_name',
]);`,
      ]);

      renderer.options.includeAttributes = false;
    });

    it('renders template and ignores specific references', () => {
      expect(renderer.renderSchema('QuxSchema', [
        new StringDefinition(options, 'first_name'),
        new StringDefinition(options, 'last_name'),
        new ReferenceDefinition(options, 'post', {
          reference: 'posts',
          export: false,
        }),
        new ArrayDefinition(options, 'posts', {
          valueType: {
            type: 'reference',
            reference: 'posts',
            export: false,
          },
        }),
      ], {
        resourceName: 'quxs',
      })).to.equal('export const QuxSchema = new Schema(\'quxs\');');
    });

    it('renders template with one references', () => {
      renderer.reader.referenceReaders.posts = { name: 'Posts' };

      expect(renderer.renderSchema('QuxSchema', [
        new StringDefinition(options, 'first_name'),
        new StringDefinition(options, 'last_name'),
        new ReferenceDefinition(options, 'post', { reference: 'posts' }),
      ], {
        resourceName: 'quxs',
      })).to.equal('export const QuxSchema = new Schema(\'quxs\');');

      expect(renderer.relations).to.deep.equal([
        `QuxSchema.hasOne({
  post: PostsSchema,
});`,
      ]);
    });

    it('renders template and avoids duplication by following attributes', () => {
      renderer.reader.referenceReaders.posts = { name: 'Posts' };

      expect(renderer.renderSchema('QuxSchema', [
        new ReferenceDefinition(options, 'post', { reference: 'posts' }),
        new StringDefinition(options, 'first_name'),
        new StringDefinition(options, 'last_name'),
      ], {
        resourceName: 'quxs',
      })).to.equal('export const QuxSchema = new Schema(\'quxs\');');

      expect(renderer.relations).to.deep.equal([
        `QuxSchema.hasOne({
  post: PostsSchema,
});`,
      ]);
    });

    it('renders template with many references', () => {
      renderer.reader.referenceReaders.posts = { name: 'Posts' };

      expect(renderer.renderSchema('QuxSchema', [
        new ArrayDefinition(options, 'posts', {
          valueType: {
            type: 'reference',
            reference: 'posts',
          },
        }),
      ], {
        resourceName: 'quxs',
      })).to.equal('export const QuxSchema = new Schema(\'quxs\');');

      expect(renderer.relations).to.deep.equal([
        `QuxSchema.hasMany({
  posts: PostsSchema,
});`,
      ]);
    });

    it('renders template with one/many references and a custom relation name', () => {
      renderer.reader.referenceReaders.posts = { name: 'Posts' };

      expect(renderer.renderSchema('QuxSchema', [
        new ReferenceDefinition(options, 'post', {
          reference: 'posts',
          relation: 'belongsTo',
        }),
        new ArrayDefinition(options, 'posts', {
          valueType: {
            type: 'reference',
            reference: 'posts',
            relation: 'belongsToMany',
          },
        }),
      ], {
        resourceName: 'quxs',
      })).to.equal('export const QuxSchema = new Schema(\'quxs\');');

      expect(renderer.relations).to.deep.equal([
        `QuxSchema.belongsTo({
  post: PostsSchema,
}).belongsToMany({
  posts: PostsSchema,
});`,
      ]);
    });

    it('renders template with everything', () => {
      renderer.options.includeAttributes = true;
      renderer.reader.referenceReaders.posts = { name: 'Posts' };

      expect(renderer.renderSchema('QuxSchema', [
        new StringDefinition(options, 'first_name'),
        new StringDefinition(options, 'last_name'),
        new ReferenceDefinition(options, 'post', {
          reference: 'posts',
          relation: 'belongsTo',
        }),
        new ArrayDefinition(options, 'posts', {
          valueType: {
            type: 'reference',
            reference: 'posts',
          },
        }),
      ], {
        resourceName: 'quxs',
      })).to.equal('export const QuxSchema = new Schema(\'quxs\');');

      expect(renderer.relations).to.deep.equal([
        `QuxSchema.addAttributes([
  'first_name',
  'last_name',
  'post',
  'posts',
]).hasMany({
  posts: PostsSchema,
}).belongsTo({
  post: PostsSchema,
});`,
      ]);

      renderer.options.includeAttributes = false;
    });

    it('errors for invalid relation name', () => {
      renderer.reader.referenceReaders.posts = { name: 'Posts' };

      expect(() => (
        renderer.renderSchema('QuxSchema', [
          new StringDefinition(options, 'first_name'),
          new StringDefinition(options, 'last_name'),
          new ReferenceDefinition(options, 'post', {
            reference: 'posts',
            relation: 'watwat',
          }),
        ], {
          resourceName: 'quxs',
        })
      )).to.throw(Error);
    });
  });

  describe('wrapFunction()', () => {
    it('wraps a value into a function', () => {
      expect(renderer.wrapFunction('foo')).to.equal('foo()');
      expect(renderer.wrapFunction('foo', 'a, b')).to.equal('foo(a, b)');
    });
  });

  describe('wrapIIFE()', () => {
    it('wraps a value into a function', () => {
      expect(renderer.wrapIIFE('foo')).to.equal('(function () { return foo; }())');
    });
  });

  describe('wrapGenerics()', () => {
    it('wraps values into a generic alias', () => {
      expect(renderer.wrapGenerics('Array', 'T')).to.equal('Array<T>');
      expect(renderer.wrapGenerics('Array', 'T1', 'T2')).to.equal('Array<T1, T2>');
    });
  });

  describe('wrapItem()', () => {
    it('wraps a value into an array item', () => {
      expect(renderer.wrapItem('foo')).to.equal('foo,');
      expect(renderer.wrapItem('foo', 1)).to.equal('  foo,');
    });
  });

  describe('wrapProperty()', () => {
    it('wraps a key and value into an object property', () => {
      expect(renderer.wrapProperty('foo', 'bar')).to.equal('foo: bar,');
      expect(renderer.wrapProperty('foo', 'bar', 1)).to.equal('  foo: bar,');
    });
  });
});
