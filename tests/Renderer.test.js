import Builder from '../src/Builder';
import ArrayDefinition from '../src/definitions/Array';
import ReferenceDefinition from '../src/definitions/Reference';
import Renderer from '../src/Renderer';
import Schematic from '../src/Schematic';
import ShapeDefinition from '../src/definitions/Shape';
import StringDefinition from '../src/definitions/String';
import { options } from './mocks';

describe('Renderer', () => {
  let renderer;

  beforeEach(() => {
    renderer = new Renderer(
      options,
      new Builder(),
      new Schematic(
        '/foo.json',
        {
          name: 'foo Bar-Baz',
          attributes: { foo: 'string' },
        },
        options,
      ),
    );
  });

  describe('formatArray()', () => {
    it('formats a string into brackets', () => {
      expect(renderer.formatArray(123, 0)).toBe('[\n123\n]');
    });

    it('formats an array by joining', () => {
      expect(renderer.formatArray([123, 456], 0)).toBe('[\n123\n456\n]');
      expect(renderer.formatArray([123, 456], 0, ',')).toBe('[\n123,456\n]');
    });

    it('customizes the spacer characters', () => {
      expect(renderer.formatArray([123, 456], 0, ',', '   ')).toBe('[   123,456   ]');
    });

    it('customizes the indentation', () => {
      expect(renderer.formatArray([123, 456], 3)).toBe('[\n123\n456\n      ]');
    });
  });

  describe('formatObject()', () => {
    it('formats a string into brackets', () => {
      expect(renderer.formatObject(123, 0)).toBe('{\n123\n}');
    });

    it('formats an array by joining', () => {
      expect(renderer.formatObject([123, 456], 0)).toBe('{\n123\n456\n}');
      expect(renderer.formatObject([123, 456], 0, ',')).toBe('{\n123,456\n}');
    });

    it('customizes the spacer characters', () => {
      expect(renderer.formatObject([123, 456], 0, ',', '   ')).toBe('{   123,456   }');
    });

    it('customizes the indentation', () => {
      expect(renderer.formatObject([123, 456], 3)).toBe('{\n123\n456\n      }');
    });
  });

  describe('formatValue()', () => {
    it('wraps strings in quotes', () => {
      expect(renderer.formatValue('foo')).toBe("'foo'");
      expect(renderer.formatValue('foo', 'string')).toBe("'foo'");
    });

    it('handles array of values', () => {
      expect(renderer.formatValue(['foo'])).toBe("['foo']");
      expect(renderer.formatValue(['foo', 123])).toBe("['foo', 123]");
    });

    it('passes functions and booleans as is', () => {
      expect(renderer.formatValue('functionName', 'function')).toBe('functionName');
      expect(renderer.formatValue(true, 'bool')).toBe('true');
      expect(renderer.formatValue(false)).toBe('false');
    });

    it('parses and passes numbers as is', () => {
      expect(renderer.formatValue(123)).toBe('123');
      expect(renderer.formatValue(123.45, 'number')).toBe('123.45');
      expect(renderer.formatValue('asds', 'number')).toBe('NaN');
    });

    it('errors on invalid types', () => {
      expect(() => renderer.formatValue('foo', 'what')).toThrowError(
        'Unknown type "what" passed to formatValue().',
      );
    });
  });

  describe('getObjectName()', () => {
    it('camel cases the name', () => {
      expect(renderer.getObjectName('foo_bar', 'baz')).toBe('FooBarBaz');
    });

    it('can append the suffix', () => {
      expect(renderer.getObjectName('foo', 'bar', 'Schema')).toBe('FooBarSchema');
    });
  });

  describe('render()', () => {
    it('errors if not defined', () => {
      expect(() => renderer.render()).toThrowError('Renderer not implemented.');
    });
  });

  describe('renderArray()', () => {
    it('errors for not supported', () => {
      expect(() => renderer.renderArray()).toThrowError(
        'The "array" definition is not supported by Renderer.',
      );
    });
  });

  describe('renderBool()', () => {
    it('errors for not supported', () => {
      expect(() => renderer.renderBool()).toThrowError(
        'The "boolean" definition is not supported by Renderer.',
      );
    });
  });

  describe('renderEnum()', () => {
    it('errors for not supported', () => {
      expect(() => renderer.renderEnum()).toThrowError(
        'The "enum" definition is not supported by Renderer.',
      );
    });
  });

  describe('renderInstance()', () => {
    it('errors for not supported', () => {
      expect(() => renderer.renderInstance()).toThrowError(
        'The "instance" definition is not supported by Renderer.',
      );
    });
  });

  describe('renderNumber()', () => {
    it('errors for not supported', () => {
      expect(() => renderer.renderNumber()).toThrowError(
        'The "number" definition is not supported by Renderer.',
      );
    });
  });

  describe('renderObject()', () => {
    it('errors for not supported', () => {
      expect(() => renderer.renderObject()).toThrowError(
        'The "object" definition is not supported by Renderer.',
      );
    });
  });

  describe('renderShape()', () => {
    it('errors for not supported', () => {
      expect(() => renderer.renderShape()).toThrowError(
        'The "shape" definition is not supported by Renderer.',
      );
    });
  });

  describe('renderString()', () => {
    it('errors for not supported', () => {
      expect(() => renderer.renderString()).toThrowError(
        'The "string" definition is not supported by Renderer.',
      );
    });
  });

  describe('renderUnion()', () => {
    it('errors for not supported', () => {
      expect(() => renderer.renderUnion()).toThrowError(
        'The "union" definition is not supported by Renderer.',
      );
    });
  });

  describe('renderAttribute()', () => {
    it('returns an empty string for invalid definition', () => {
      expect(renderer.renderAttribute('foo')).toBe('');
    });
  });

  describe('renderConstant()', () => {
    it('renders primitive values', () => {
      expect(renderer.renderConstant('FOO', 'bar')).toBe("export const FOO = 'bar';");
      expect(renderer.renderConstant('FOO', 123)).toBe('export const FOO = 123;');
      expect(renderer.renderConstant('FOO', 456.78)).toBe('export const FOO = 456.78;');
      expect(renderer.renderConstant('FOO', true)).toBe('export const FOO = true;');
      expect(renderer.renderConstant('FOO', false)).toBe('export const FOO = false;');
    });

    it('renders an array of primitive values', () => {
      expect(renderer.renderConstant('FOO', ['bar', 123, 456.78, true])).toBe(
        "export const FOO = ['bar', 123, 456.78, true];",
      );
    });
  });

  describe('renderImport()', () => {
    it('errors if no `path` is set', () => {
      expect(() => renderer.renderImport({})).toThrowError(
        'Import statements require a file path.',
      );
    });

    it('errors if `named` is not an array', () => {
      expect(() => renderer.renderImport({ path: '/', named: true })).toThrowError(
        'Named imports must be an array.',
      );
    });

    it('errors if no named or default imports', () => {
      expect(() => renderer.renderImport({ path: '/', named: [] })).toThrowError(
        'Import statements require either a default export or named exports.',
      );
    });

    it('renders a default import', () => {
      expect(
        renderer.renderImport({
          path: '/',
          default: 'DefaultName',
        }),
      ).toBe("import DefaultName from '/';");
    });

    it('renders named imports', () => {
      expect(
        renderer.renderImport({
          path: '/',
          named: ['foo', 'bar'],
        }),
      ).toBe("import { foo, bar } from '/';");
    });

    it('renders a default and named imports', () => {
      expect(
        renderer.renderImport({
          path: '/',
          default: 'DefaultName',
          named: ['foo', 'bar'],
        }),
      ).toBe("import DefaultName, { foo, bar } from '/';");
    });
  });

  describe('renderPlainObject()', () => {
    it('renders correctly', () => {
      expect(
        renderer.renderPlainObject({
          string: 'foo',
          number: 123,
          boolean: true,
        }),
      ).toBe(`{
  string: 'foo',
  number: 123,
  boolean: true,
}`);
    });

    it('supports arrays', () => {
      expect(
        renderer.renderPlainObject({
          values: ['foo', 123, true],
        }),
      ).toBe(`{
  values: ['foo', 123, true],
}`);
    });
  });

  describe('renderShapeReference()', () => {
    it('errors if reference doesnt exist', () => {
      renderer.schematic.shapes = {};

      expect(() =>
        renderer.renderShapeReference(
          new ShapeDefinition(options, 'attr', {
            reference: 'foo',
          }),
        ),
      ).toThrowError('The shape reference "foo" does not exist in the "foo Bar-Baz" schema.');
    });
  });

  describe('renderReference()', () => {
    it('errors if reference doesnt exist', () => {
      renderer.schematic.referenceSchematics = {};

      expect(() =>
        renderer.renderReference(
          new ReferenceDefinition(options, 'attr', {
            reference: 'foo',
          }),
        ),
      ).toThrowError('The reference "foo" does not exist in the "foo Bar-Baz" schema.');
    });

    it('errors if subset doesnt exist', () => {
      renderer.schematic.referenceSchematics.bar = new Schematic(
        '/bar.json',
        {
          name: 'bar',
          attributes: { foo: 'string' },
        },
        options,
      );

      expect(() =>
        renderer.renderReference(
          new ReferenceDefinition(options, 'attr', {
            reference: 'bar',
            subset: 'sub',
          }),
        ),
      ).toThrowError('The reference "bar" does not contain a subset named "sub".');
    });
  });

  describe('renderSchema()', () => {
    it('errors if no resource name', () => {
      expect(() => renderer.renderSchema('QuxSchema', [], {})).toThrowError();
    });

    it('errors if invalid resource name', () => {
      expect(() => renderer.renderSchema('QuxSchema', [], { resourceName: true })).toThrowError();
    });

    it('renders template', () => {
      expect(
        renderer.renderSchema('QuxSchema', [], {
          resourceName: 'quxs',
        }),
      ).toBe("export const quxSchema = new Schema('quxs');");
    });

    it('renders template with primary key', () => {
      expect(
        renderer.renderSchema('QuxSchema', [], {
          resourceName: 'quxs',
          primaryKey: 'uuid',
        }),
      ).toBe("export const quxSchema = new Schema('quxs', 'uuid');");
    });

    it('renders template with attributes', () => {
      renderer.options.includeAttributes = true;

      expect(
        renderer.renderSchema(
          'QuxSchema',
          [new StringDefinition(options, 'first_name'), new StringDefinition(options, 'last_name')],
          {
            resourceName: 'quxs',
          },
        ),
      ).toBe("export const quxSchema = new Schema('quxs');");

      expect(Array.from(renderer.builder.relations)).toEqual([
        `quxSchema
  .addAttributes([
    'first_name',
    'last_name',
  ]);`,
      ]);

      renderer.options.includeAttributes = false;
    });

    it('renders template and ignores specific references', () => {
      expect(
        renderer.renderSchema(
          'QuxSchema',
          [
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
          ],
          {
            resourceName: 'quxs',
          },
        ),
      ).toBe("export const quxSchema = new Schema('quxs');");
    });

    it('renders template with one references', () => {
      renderer.schematic.referenceSchematics.posts = { name: 'Posts' };

      expect(
        renderer.renderSchema(
          'QuxSchema',
          [
            new StringDefinition(options, 'first_name'),
            new StringDefinition(options, 'last_name'),
            new ReferenceDefinition(options, 'post', { reference: 'posts' }),
          ],
          {
            resourceName: 'quxs',
          },
        ),
      ).toBe("export const quxSchema = new Schema('quxs');");

      expect(Array.from(renderer.builder.relations)).toEqual([
        `quxSchema
  .hasOne({
    post: postsSchema,
  });`,
      ]);
    });

    it('renders template and avoids duplication by following attributes', () => {
      renderer.schematic.referenceSchematics.posts = { name: 'Posts' };

      expect(
        renderer.renderSchema(
          'QuxSchema',
          [
            new ReferenceDefinition(options, 'post', { reference: 'posts' }),
            new StringDefinition(options, 'first_name'),
            new StringDefinition(options, 'last_name'),
          ],
          {
            resourceName: 'quxs',
          },
        ),
      ).toBe("export const quxSchema = new Schema('quxs');");

      expect(Array.from(renderer.builder.relations)).toEqual([
        `quxSchema
  .hasOne({
    post: postsSchema,
  });`,
      ]);
    });

    it('renders template with many references', () => {
      renderer.schematic.referenceSchematics.posts = { name: 'Posts' };

      expect(
        renderer.renderSchema(
          'QuxSchema',
          [
            new ArrayDefinition(options, 'posts', {
              valueType: {
                type: 'reference',
                reference: 'posts',
              },
            }),
          ],
          {
            resourceName: 'quxs',
          },
        ),
      ).toBe("export const quxSchema = new Schema('quxs');");

      expect(Array.from(renderer.builder.relations)).toEqual([
        `quxSchema
  .hasMany({
    posts: postsSchema,
  });`,
      ]);
    });

    it('renders template with one/many references and a custom relation name', () => {
      renderer.schematic.referenceSchematics.posts = { name: 'Posts' };

      expect(
        renderer.renderSchema(
          'QuxSchema',
          [
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
          ],
          {
            resourceName: 'quxs',
          },
        ),
      ).toBe("export const quxSchema = new Schema('quxs');");

      expect(Array.from(renderer.builder.relations)).toEqual([
        `quxSchema
  .belongsTo({
    post: postsSchema,
  })
  .belongsToMany({
    posts: postsSchema,
  });`,
      ]);
    });

    it('renders template with everything', () => {
      renderer.options.includeAttributes = true;
      renderer.schematic.referenceSchematics.posts = { name: 'Posts' };

      expect(
        renderer.renderSchema(
          'QuxSchema',
          [
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
          ],
          {
            resourceName: 'quxs',
          },
        ),
      ).toBe("export const quxSchema = new Schema('quxs');");

      expect(Array.from(renderer.builder.relations)).toEqual([
        `quxSchema
  .belongsTo({
    post: postsSchema,
  })
  .hasMany({
    posts: postsSchema,
  })
  .addAttributes([
    'first_name',
    'last_name',
    'post',
    'posts',
  ]);`,
      ]);

      renderer.options.includeAttributes = false;
    });

    it('renders template using useDefine define syntax', () => {
      renderer.schematic.referenceSchematics.posts = { name: 'Posts' };
      renderer.options.useDefine = true;

      expect(
        renderer.renderSchema(
          'QuxSchema',
          [
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
          ],
          {
            resourceName: 'quxs',
          },
        ),
      ).toBe("export const quxSchema = new Schema('quxs');");

      expect(Array.from(renderer.builder.relations)).toEqual([
        `quxSchema
  .define({
    post: postsSchema,
    posts: [postsSchema],
  });`,
      ]);
    });
  });

  describe('wrapFunction()', () => {
    it('wraps a value into a function', () => {
      expect(renderer.wrapFunction('foo')).toBe('foo()');
      expect(renderer.wrapFunction('foo', 'a, b')).toBe('foo(a, b)');
    });
  });

  describe('wrapIIFE()', () => {
    it('wraps a value into a function', () => {
      expect(renderer.wrapIIFE('foo')).toBe('(function () { return foo; }())');
    });
  });

  describe('wrapGenerics()', () => {
    it('wraps values into a generic alias', () => {
      expect(renderer.wrapGenerics('Array', 'T')).toBe('Array<T>');
      expect(renderer.wrapGenerics('Array', 'T1', 'T2')).toBe('Array<T1, T2>');
    });
  });

  describe('wrapItem()', () => {
    it('wraps a value into an array item', () => {
      expect(renderer.wrapItem('foo')).toBe('foo,');
      expect(renderer.wrapItem('foo', 1)).toBe('  foo,');
    });
  });

  describe('wrapProperty()', () => {
    it('wraps a key and value into an object property', () => {
      expect(renderer.wrapProperty('foo', 'bar')).toBe('foo: bar,');
      expect(renderer.wrapProperty('foo', 'bar', 1)).toBe('  foo: bar,');
    });
  });
});
