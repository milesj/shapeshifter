# Shapeshifter

[![Build Status](https://travis-ci.org/milesj/shapeshifter.svg?branch=master)](https://travis-ci.org/milesj/shapeshifter)

Shapeshifter is a command line tool for generating ECMAScript (ES) compatible files that export
React prop types, Flow type aliases, or TypeScript interfaces, as well as relation schema classes
from JSON or GraphQL schematic files. Schematics can represent database tables, API endpoints, data
structures, resources, internal shapes, and more.

Take this user schematic for example.

```json
{
  "name": "User",
  "attributes": {
    "id": "number",
    "username": "string",
    "email": {
      "type": "string",
      "nullable": true
    },
    "location": {
      "type": "shape",
      "attributes": {
        "lat": "number",
        "long": "number"
      }
    }
  }
}
```

Which transpiles down to the following React prop types.

```javascript
import PropTypes from 'prop-types';

export const UserShape = PropTypes.shape({
  id: PropTypes.number.isRequired,
  username: PropTypes.string.isRequired,
  email: PropTypes.string,
  location: PropTypes.shape({
    lat: PropTypes.number.isRequired,
    long: PropTypes.number.isRequired,
  }).isRequired,
});
```

Or the following Flow type aliases.

```javascript
// @flow

export type UserType = {
  id: number,
  username: string,
  email: ?string,
  location: {
    lat: number,
    long: number,
  },
};
```

Or TypeScript interfaces.

```javascript
export interface UserInterface {
  id: number;
  username: string;
  email: string;
  location: {
    lat: number,
    long: number,
  };
}
```

And finally, the schema class. Which can define ORM styled relations.

```javascript
export const userSchema = new Schema('users', 'id');
```

## Requirements

* ES2015+
* Node 4+
* React 15/16+ / Flow 0.30+ / TypeScript 2.0+
* IE 10+

## Installation

Shapeshifter can be used as a dev dependency if you're only generating types (shapes, aliases,
interfaces, etc).

```
npm install shapeshifter --save-dev
// Or
yarn add shapeshifter --dev
```

If you're generating schema classes, it will need to be a normal dependency.

```
npm install shapeshifter --save
// Or
yarn add shapeshifter
```

## Usage

Shapeshifter is provided as a binary which can be executed and piped like so.

```
shapeshifter build [options] <input> > <output>
```

The binary input accepts either a single schematic file, a directory of schematic files, or multiple
files. If a directory is provided, they will be combined into a single output.

By default, the binary will send output to stdout, which can then be redirected to a destination of
your choosing, otherwise the output will be sent to the console.

### Options

* `--nullable`, `-n` (bool) - Marks all attributes as nullable by default. Not applicable to
  GraphQL. Defaults to false.
* `--indent` (string) - Defines the indentation characters to use in the generated output. Defaults
  to 2 spaces.
* `--import` (string) - The import path to a `Schema` class, inserted at the top of every output
  file. Defaults to "shapeshifter".
* `--format` (string) - The format to output to. Accepts "react", "flow", or "typescript". Defaults
  to "react".
* `--schemas` (bool) - Include schema class exports in the output. Defaults to "false".
* `--attributes` (bool) - Include an attribute list in the schema class export. Defaults to "false".
* `--types` (bool) - Include type definition exports in the output. Defaults to "false".
* `--useDefine` (bool) - Update all schema relations to use `Schema#define`.
* `--stripPropTypes` (bool) - Wrap PropType definitions in `process.env.NODE_ENV` production
  expressions, allowing them to be removed with dead code elimination.

## Documentation

* [Schematic Structure](#schematic-structure)
  * [Attributes](#attributes)
  * [Metadata](#metadata)
  * [Imports](#imports)
  * [Constants](#constants)
  * [Subsets](#subsets)
* [GraphQL Support](#graphql-support)
* [Attribute Types](#attribute-types)
  * [Primitives](#primitives)
  * [Arrays](#arrays)
  * [Objects](#objects)
  * [Enums](#enums)
  * [Shapes](#shapes)
    * [Shape References](#shape-references)
  * [Unions](#unions)
  * [References](#references)
    * [Self References](#self-references)
    * [Exported Schemas](#exported-schemas)
    * [Relation Type](#relation-type)
  * [Instance Ofs](#instance-ofs)
* [Schema Classes](#schema-classes)
  * [Including Attributes](#including-attributes)
  * [Including Relations](#including-relations)
* [Auto-Transpilation](#auto-transpilation)
  * [Webpack](#webpack)

### Schematic Structure

Shapeshifter is powered by files known as schematics, which can be a JSON (`.json`), JavaScript
(`.js`), or GraphQL file (`.gql`). Schematics must define a name, used to denote the name of the ES
export, and set of attributes, used as as fields in which the schematic is defining.

```json
{
  "name": "User",
  "attributes": {
    "id": "number"
  }
}
```

```javascript
module.exports = {
  name: 'User',
  attributes: {
    id: 'number',
  },
};
```

```graphql
type User {
  id: ID
}
```

> GraphQL has limited functionality compared to JSON or JavaScript. Jump to the section on
> [GraphQL](#graphql-support), and read the documentation thoroughly, for more information.

#### Attributes

The `attributes` object represents a mapping of fields to [type definitions](#attribute-types).
Attributes are usually a one-to-one mapping of database table columns or data model attributes.

The value of a field, the type definition, represents what type of data this value expects to be.
This definition can either be a string of the name of a [primitive type](#primitives), or an object
with a required `type` property, which can be the name of any type.

Depending on the type used, additional properties may be required.

```json
"attributes": {
  "primitiveField": "string",
  "compoundField": {
    "type": "enum",
    "valueType": "number",
    "values": [1, 2, 3]
  }
}
```

> For GraphQL, attributes are analogous to
> [fields](https://facebook.github.io/graphql/#sec-Language.Fields).

##### Nullable

All attribute type definitions support the `nullable` modifier, which accepts a boolean value, and
triggers the following:

* React: Non-nullable fields will append `isRequired` to the prop type.
* Flowtype: Nullable fields will prepend `?` to each type alias.
* TypeScript: Does nothing, please use `--strictNullChecks` provided by TypeScript.

```json
"field": {
  "type": "string",
  "nullable": false
}
```

If using GraphQL, all attributes are nullable by default. To mark a field as non-nullable, append an
exclamation mark (`!`) to the type.

```graphql
field: String!
```

#### Metadata

The `meta` object allows arbitrary metadata to be defined. Only two fields are supported currently,
`primaryKey` and `resourceName`, both of which are used when generating `Schema` classes using
`--schemas`. The `primaryKey` defines the unique identifier / primary key of the record, usually
"id" (default), while `resourceName` is the unique name found in a URL path. For example, in the URL
"/api/users/123", the "users" path part would be the resource name, and "123" would be the primary
key.

```json
"meta": {
  "primaryKey": "id",
  "resourceName": "users"
}
```

Compound keys are supported by passing an array of attribute names.

```json
"meta": {
  "primaryKey": ["start_date", "end_date"],
  "resourceName": "calendar"
}
```

If using GraphQL, the `ID` type can be used to denote a primary key.

```graphql
type User {
  id: ID
}
```

> Extra metadata will be passed as an object to the `Schema` instance, if `--schemas` is passed on
> the command line.

> Schematics with no `resourceName` defined will be omitted from the final output.

#### Imports

The `imports` array provides a mechanism for defining ES imports, which in turn allow re-use of
application level structures.

An import object requires a `path` property that maps to a file in the application, relative to the
transpiled schema. Default imports can be defined with the `default` property, while named imports
can be defined with `named` (an array).

```json
"imports": [
  { "path": "./foo.js", "default": "FooClass" },
  { "path": "../bar.js", "named": ["funcName", "constName"] },
  { "path": "../baz/qux.js", "default": "BarClass", "named": ["className"] }
]
```

> Imports are not supported by GraphQL.

#### Constants

The `constants` object is a mapping of a constant to a primitive value or an array of primitive
values. Constants are transpiled down to exported ES `const`s, allowing easy re-use of values.

The primary use case of this feature is to provide constants from a backend model layer that can
easily be used on the frontend, without introducing duplication.

```json
"constants": {
  "STATUS_PENDING": 0,
  "STATUS_ACTIVE": 1,
  "STATUSES": [0, 1],
  "ADMIN_FLAG": "admin"
}
```

> Constants are not supported by GraphQL.

#### Subsets

The `subsets` object allows for smaller sets of attributes to be defined and exported in the ES
output. Each key in the object represents a unique name for the subset, while the value of each
property can either be an array of [attribute names](#attributes), or an object of `attributes` and
`nullable` (optional) properties.

Unlike `nullable` properties found on type definitions, this property represents a mapping of
attributes in the current subset to boolean values, which enable or disable the modifier.

```json
"subsets": {
  "SetA": ["foo", "bar"],
  "SetB": {
    "attributes": ["foo", "baz"],
    "nullable": {
      "foo": true
    }
  }
},
"attributes": {
  "foo": "number",
  "bar": "bool",
  "baz": {
    "type": "string",
    "nullable": true
  }
}
```

> Subsets are not supported by GraphQL.

### GraphQL Support

Shapeshifter supports reading from GraphQL (`.gql`) type files -- if you prefer GraphQL over
JavaScript/JSON. However, since GraphQL is a rather strict and direct representation of a data
model, only a small subset of Shapeshifter functionality is available.

When defining a GraphQL schematic, multiple definitions (`type`, `enum`, `union`, etc) can exist in
a single schematic, with the last `type` definition being used as the schematic representation. All
prior definitions will be used as internal shapes, references, enums, and unions.

For more guidance, [take a look at our test cases.](./tests/schemas/gql/)

> Introspection support being looked into!

### Attribute Types

For every attribute defined in a schematic, a type definition is required. Types will be generated
when the `--types` CLI option is passed. The following types are supported.

#### Primitives

There are 3 primitive types, all of which map to native JavaScript primitives. They are `string`,
`number`, and `boolean`. Primitives are the only types that support shorthand notation.

```json
"name": "string",
"status": "number",
"active": "boolean",
```

```graphql
name: String
status: Int
active: Boolean
```

As well as the expanded standard notation.

```json
"name": {
  "type": "string"
},
"status": {
  "type": "number"
},
"active": {
  "type": "boolean"
},
```

This transpiles down to:

```javascript
// React
name: PropTypes.string,
status: PropTypes.number,
active: PropTypes.bool,

// Flow
name: string,
status: number,
active: boolean,

// TypeScript
name: string;
status: number;
active: boolean;
```

Alias names: `str`, `num`, `int`, `integer`, `float`, `bool`, `binary`

#### Arrays

An `array` is a dynamic list of values, with the value's type defined by the `valueType` property.

```json
"messages": {
  "type": "array",
  "valueType": {
    "type": "string"
  }
}
```

```graphql
messages: [String]
```

This transpiles down to:

```javascript
// React
messages: PropTypes.arrayOf(PropTypes.string),

// Flow
messages: string[],

// TypeScript
messages: string[];
```

Alias names: `arr`, `list`

#### Objects

An `object` maps key-value pairs through the `keyType` and `valueType` properties -- both of which
are type definitions. When transpiling down to React, the `keyType` is not required.

This is equivalent to generics from other languages: `Object<T1, T2>`.

```json
"costs": {
  "type": "object",
  "keyType": "string",
  "valueType": {
    "type": "number"
  }
}
```

This transpiles down to:

```javascript
// React
costs: PropTypes.objectOf(PropTypes.number),

// Flow
costs: { [key: string]: number },

// TypeScript
costs: { [key: string]: number };
```

Alias names: `obj`, `map`

> Objects are not supported by GraphQL. Use shapes instead.

#### Enums

An `enum` is a fixed list of values, with both the values and the value type being defined through
the `values` and `valueType` properties respectively.

```json
"words": {
  "type": "enum",
  "valueType": "string",
  "values": ["foo", "bar", "baz"]
}
```

```graphql
enum WordsEnum {
  FOO
  BAR
  BAZ
}

words: WordsEnum
```

This transpiles down to:

```javascript
// React
words: PropTypes.oneOf(['foo', 'bar', 'baz']),

// Flow
words: 'foo' | 'bar' | 'baz',

// TypeScript
export enum SchemaWordsEnum {
  foo = 0,
  bar = 1,
  baz = 2
}

words: SchemaWordsEnum;
```

> Transpilation output slightly differs when using GraphQL.

#### Shapes

A `shape` is a key-value object with its own set of attributes and types. A shape differs from an
object in that an object defines the type for all keys and values, while a shape defines individual
attributes. This provides nested structures within a schematic.

A shape is similar to a struct found in the C language.

```json
"location": {
  "type": "shape",
  "attributes": {
    "lat": "number",
    "long": "number",
    "name": {
      "type": "string",
      "nullable": true
    }
  }
}
```

```graphql
type LocationStruct {
  lat: Number
  long: Number
  name: String!
}

location: LocationStruct
```

This transpiles to:

```
// React
location: PropTypes.shape({
  lat: PropTypes.number.isRequired,
  long: PropTypes.number.isRequired,
  name: PropTypes.string,
}),

// Flow
location: {
  lat: number,
  long: number,
  name: ?string,
},

// TypeScript
location: {
  lat: number,
  long: number,
  name: string,
},
```

Alias names: `struct`

##### Shape References

Shapes are powerful at defining nested attributes, while [references](#references) are great at
reusing external schematics. Shape references are a combination of both of these patterns -- it
permits a local shape definition to be used throughout multiple attributes.

To begin, define a mapping of attributes, under unique name, in the top level `shapes` property.

```json
{
  "name": "Receipt",
  "shapes": {
    "Price": {
      "amount": "number",
      "nativeAmount": "number",
      "exchangeRate": "number"
    }
  },
  "attributes": {}
}
```

Once the shape definition exists, we can point out attributes to the shape using the `reference`
property, like so.

```json
"attributes": {
  "fees": {
    "type": "shape",
    "reference": "Price"
  },
  "taxes": {
    "type": "shape",
    "reference": "Price"
  },
  "total": {
    "type": "shape",
    "reference": "Price"
  }
}
```

With this approach, the `attributes` property is not required for each shape type.

> If an additional `type` definition exists within a GraphQL schematic, it will be treated as a
> shape reference, otherwise, a normal reference.

#### Unions

The `union` type provides a logical OR operation against a list of type definitions defined at
`valueTypes`. Any value passed through this attribute must match one of the types in the list.

```json
"error": {
  "type": "union",
  "valueTypes": [
    "string",
    { "type": "number" },
    {
      "type": "instance",
      "contract": "Error"
    }
  ]
}
```

```graphql
union PrimitiveUnion = String | Int

error: PrimitiveUnion
```

This transpiles to:

```javascript
// React
error: PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.number,
  PropTypes.instanceOf(Error),
]),

// Flow
error: string | number | Error,

// TypeScript
error: string | number | Error;
```

#### References

The final type, `reference`, is the most powerful and versatile type. A reference provides a link to
an external schematic file, permitting easy re-use and extensibility, while avoiding schematic
structure duplication across files.

To make use of references, a `references` map must be defined in the root of the schematic. Each
value in the map is a relative path to an external schematic file.

```json
{
  "name": "User",
  "references": {
    "Profile": "./Profile.json"
  },
  "attributes": {}
}
```

Once the reference map exists, we can define the attribute type, which requires the `reference`
property to point to a key found in the references map. An optional `subset` property can be defined
that points to a subset found in the reference schematic file.

```json
"profile": {
  "type": "reference",
  "reference": "Profile",
  "subset": ""
}
```

```graphql
profile: Profile
```

This transpiles to:

```javascript
// React
profile: ProfileShape,

// Flow
profile: ProfileType,

// TypeScript
profile: ProfileInterface;
```

Alias names: `ref`

> If a `type` definition does not exist in a GraphQL schematic, Shapeshifter will assume it to be a
> reference to a relative file of the same name. For example, using the code block mentioned
> previously, `./Profile.gql`.

##### Self References

It's possible to create recursive structures using the `self` property, which refers to the current
schematic in which it was defined. When using self, the `reference` property and the `references`
map is not required.

```json
"node": {
  "type": "reference",
  "self": true
}
```

```graphql
type Schema {
  node: Schema
}
```

##### Exported Schemas

When generating schema classes using the `--schemas` CLI option, all references defined in a
schematic are considered a relation (ORM style), and in turn, will generate schemas as well. To
disable this export from occurring, set `export` to false.

```json
"node": {
  "type": "reference",
  "reference": "field",
  "export": false
}
```

> Disabling exports are not supported by GraphQL.

##### Relation Type

When generating schema classes, like above, a reference attribute can define the type of relation it
has with the parent schema, using ORM styled terminology, and the `relation` property.

The following relation types are supported, which are based on the `Schema`
[class constants](#schema-classes): `hasOne`, `hasMany`, `belongsTo`, and `belongsToMany` (many to
many).

```json
"node": {
  "type": "reference",
  "reference": "field",
  "relation": "belongsTo"
}
```

> Customizing the relation type is not supported by GraphQL.

#### Instance Ofs

The `instance` type provides a mechanism for comparing a value to an object (class, function, etc)
found in JavaScript. While this doesn't necessarily map to a database table, it does provide an easy
way to map to something like a model in the application.

The instance type requires a `contract` property, which is the name of the object.

```json
"model": {
  "type": "instance",
  "contract": "UserModel"
}
```

For the most part, this feature must be used in unison with [imports](#imports), as to pull the
object into scope.

```json
"imports": [
  { "default": "UserModel", "path": "../models/UserModel" }
]
```

This transpiles down to:

```javascript
import UserModel from '../models/UserModel';

// React
model: PropTypes.instanceOf(UserModel),

// Flow
model: UserModel,

// TypeScript
model: UserModel;
```

Alias names: `inst`

> Instance Ofs are not supported by GraphQL.

### Schema Classes

Schema classes are ES based classes that are generated and included in the output when `--schemas`
is passed to the command line. These schemas provide basic attribute and relational support, which
in turn can be used by consuming libraries through exports.

Using our users example from the intro, and the `--schemas` CLI options, we would get the following
output.

```javascript
export const userSchema = new Schema('users', 'id');
```

The following properties are available on the `Schema` class instance.

* `resourceName` (string) - The resource name of the schema, passed as the first argument to the
  constructor. This field is based on `meta.resourceName` in the schematic file.
* `primaryKey` (string|string[]) - The name of the primary key in the current schema, passed as the
  second argument to the constructor. Compound keys can be supported by passing an array of
  attribute names. This field is based on `meta.primaryKey` in the JSON schematic file. Defaults to
  "id".
* `attributes` (string[]) - List of attribute names in the current schema.
* `metadata` (object) - Extra metadata defined in the current schema.
* `relations` (object[]) - List of relational objects that map specific attributes to externally
  referenced schemas. The relational object follows this structure:

```javascript
{
  attribute: 'foo',         // Field name
  schema: new Schema(),     // Reference schema class
  relation: Schema.HAS_ONE, // Relation type
  collection: false,        // Is it an array?
}
```

* `relationTypes` (object) - Maps attribute names to relation types. A relation type is one of the
  following constants found on the `Schema` class: `HAS_ONE`, `HAS_MANY`, `BELONGS_TO`,
  `BELONGS_TO_MANY`.

> Schemas are not supported by GraphQL.

#### Including Attributes

By default, attributes are excluded from the output unless the `--attributes` CLI option is passed.
Once passed, they are defined as a list of strings using `addAttributes()`.

Continuing with our previous example, the output will be.

```javascript
export const userSchema = new Schema('users', 'id');

userSchema.addAttributes(['id', 'username', 'email', 'location']);
```

#### Including Relations

Unlike attributes, relations are always included in the output, as relations between entities (via
schemas) are highly informational. Relations are divided into 4 categories: has one, has many,
belongs to, and belongs to many (many to many).

Relations are generated based on [references](#references) found within the current schema. Assume
we add a has many `posts` relation, and a has one `country` relation to the current `users` schema,
we would generate the following output.

```javascript
export const countrySchema = new Schema('countries');

export const postSchema = new Schema('posts');

export const userSchema = new Schema('users');

postSchema.belongsTo({
  user: userSchema,
});

userSchema
  .hasOne({
    country: countrySchema,
  })
  .hasMany({
    posts: postSchema,
  });
```

If `--useDefine` is passed on the command line, the relation output will be modified to:

```javascript
postSchema.define({
  user: userSchema,
});

userSchema.define({
  country: countrySchema,
  posts: [postSchema],
});
```

### Auto-Transpilation

By default, Shapeshifter transpiles schematics to a target folder through a manual CLI script. This
can be problematic, as the command may incur VCS conflicts, or simply, developers will forget to run
the command.

To mitigate this issue, an auto-transpilation plugin can be added to your build/bundle process. This
plugin will intercept a custom import path and replace the source code with the transpiled
Shapeshifter output.

```javascript
import { userSchema } from 'shapeshifter/schematics';
```

The plugin accepts an object with the following options -- with most of them being based on the
[options passed to the command line](#options).

* `schematicsSource` (string | string[]) - Absolute file system path to schematics source folder.
  _Required._
* `schematicsImportPath` (string) - The fake import path to intercept. Defaults to
  `shapeshifter/schematics`.
* `defaultNullable`
* `format`
* `importPath`
* `includeAttributes`
* `includeSchemas`
* `includeTypes`
* `indentCharacter`
* `stripPropTypes`
* `useDefine`

#### Webpack

To automatically transpile Shapeshifter during Webpack's build process, add the Webpack plugin.

```javascript
const ShapeshifterPlugin = require('shapeshifter/lib/bundlers/WebpackPlugin').default;

// Webpack config
plugins: [
  new ShapeshifterPlugin({
    schematicsSource: path.join(__dirname, 'src/schemas'),
  }),
],
```

#### Browserify, Gulp, Grunt

Looking into...

## FAQ

**Why `arrayOf`, `objectOf` over `array`, `object` React prop types?**

I chose `arrayOf` and `objectOf` because they provide type safety and the assurance of the values
found within the collection. Using non-type safe features would defeat the purpose of this library.

**What about `node`, `element`, and `func` React prop types?**

The `node` and `element` types represent DOM elements or React structures found within the
application. These types don't really map to database tables or data structures very well, if at
all.
