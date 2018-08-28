# Type Definitions

For every attribute defined in a schematic, a type definition is required. Types will be generated
when the `--definitions` CLI option is passed. The following types are supported.

## Primitives

There are 3 primitive types, all of which map to native JavaScript primitives. They are `string`,
`number`, and `boolean`. Primitives are the only types that support shorthand notation.

```json
{
  "name": "string",
  "status": "number",
  "active": "boolean"
}
```

```graphql
name: String
status: Int
active: Boolean
```

As well as the expanded standard notation.

```json
{
  "name": {
    "type": "string"
  },
  "status": {
    "type": "number"
  },
  "active": {
    "type": "boolean"
  }
}
```

This transpiles down to:

```javascript
// PropTypes
name: PropTypes.string.isRequired,
status: PropTypes.number.isRequired,
active: PropTypes.bool.isRequired,

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

## Keys

A `key` type is the representation of a primary key or foreign key, like an auto-incrementing ID or
UUID. It supports both integer and string fields.

```json
{
  "id": "key"
}
```

```graphql
id: ID
```

This transpiles down to:

```javascript
// PropTypes
const KeyShape = PropTypes.oneOfType([
  PropTypes.string.isRequired,
  PropTypes.number.isRequired,
]).isRequired;

id: KeyShape,

// Flow
type Key = string | number;

id: Key,

// TypeScript
type Key = string | number;

id: Key;
```

Alias names: `pk`, `fk`

> Key definitions will define a special key type alias for easy re-use.

## Arrays

An `array` is a dynamic list of values, with the value's type defined by the `valueType` property.

```json
{
  "messages": {
    "type": "array",
    "valueType": {
      "type": "string"
    }
  }
}
```

```graphql
messages: [String]
```

This transpiles down to:

```javascript
// PropTypes
messages: PropTypes.arrayOf(PropTypes.string).isRequired,

// Flow
messages: string[],

// TypeScript
messages: string[];
```

Alias names: `arr`, `list`

## Objects

An `object` maps key-value pairs through the `keyType` and `valueType` properties -- both of which
are type definitions. When transpiling down to PropTypes, the `keyType` is not required.

This is equivalent to generics from other languages: `Object<T1, T2>`.

```json
{
  "costs": {
    "type": "object",
    "keyType": "string",
    "valueType": {
      "type": "number"
    }
  }
}
```

This transpiles down to:

```javascript
// PropTypes
costs: PropTypes.objectOf(PropTypes.number).isRequired,

// Flow
costs: { [key: string]: number },

// TypeScript
costs: { [key: string]: number };
```

Alias names: `obj`, `map`

> Key types default to string.

> Objects are not supported by GraphQL. Use shapes instead.

## Enums

An `enum` is a fixed list of values, with both the values and the value type being defined through
the `values` and `valueType` properties respectively.

```json
{
  "words": {
    "type": "enum",
    "valueType": "string",
    "values": ["foo", "bar", "baz"]
  }
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
// PropTypes
words: PropTypes.oneOf(['foo', 'bar', 'baz']).isRequired,

// Flow
words: 'foo' | 'bar' | 'baz',

// TypeScript
export enum SchemaWordsEnum {
  foo,
  bar,
  baz
}

words: SchemaWordsEnum;

// TypeScript with --no-enums
words: 'foo' | 'bar' | 'baz',
```

> Transpilation output slightly differs when using GraphQL.

### Constant References

If [constants](./schematic.md#constants) have been defined in the schematic, and used directly
within an enum type definition, they can be activated using the `constant` config option. Once
generated, all enums (when applicable) will reference the constant instead of defining a literal
value.

```js
// Schematic
const FOO = 1;
const BAR = 2;
const BAZ = 3;

module.exports = {
  name: 'Enums',
  constants: {
    FOO,
    BAR,
    BAZ,
  },
  attributes: {
    consts: {
      type: 'enum',
      valueType: 'number',
      values: ['FOO', 'BAR', 'BAZ'],
      constant: true,
    },
  },
};

// PropTypes
import PropTypes from 'prop-types';

export const FOO = 1;
export const BAR = 2;
export const BAZ = 3;

export const EnumsShape = PropTypes.shape({
  consts: PropTypes.oneOf([FOO, BAR, BAZ]),
});
```

## Shapes

A `shape` is a key-value object with its own set of attributes and types. A shape differs from an
object in that an object defines the type for all keys and values, while a shape defines individual
attributes. This provides nested structures within a schematic.

A shape is similar to a struct found in the C language.

```json
{
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
// PropTypes
location: PropTypes.shape({
  lat: PropTypes.number.isRequired,
  long: PropTypes.number.isRequired,
  name: PropTypes.string,
}).isRequired,

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
  name: string | null,
},
```

Alias names: `struct`

### Shape References

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
{
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
}
```

With this approach, the `attributes` property is not required for each shape type.

> If an additional `type` definition exists within a GraphQL schematic, it will be treated as a
> shape reference, otherwise, a normal reference.

## Unions

The `union` type provides a logical OR operation against a list of type definitions defined at
`valueTypes`. Any value passed through this attribute must match one of the types in the list.

```json
{
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
}
```

```graphql
union PrimitiveUnion = String | Int

error: PrimitiveUnion
```

This transpiles to:

```javascript
// PropTypes
error: PropTypes.oneOfType([
  PropTypes.string.isRequired,
  PropTypes.number.isRequired,
  PropTypes.instanceOf(Error).isRequired,
]).isRequired,

// Flow
error: string | number | Error,

// TypeScript
error: string | number | Error;
```

> Direct value types cannot be nullable.

## References

The type `reference` is the most powerful and versatile type. A reference provides a link to an
external schematic file, permitting easy re-use and extensibility, while avoiding schematic
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
{
  "profile": {
    "type": "reference",
    "reference": "Profile",
    "subset": ""
  }
}
```

```graphql
profile: Profile
```

This transpiles to:

```javascript
// PropTypes
profile: ProfileShape.isRequired,

// Flow
profile: ProfileType,

// TypeScript
profile: ProfileInterface;
```

Alias names: `ref`

> If a `type` definition does not exist in a GraphQL schematic, Shapeshifter will assume it to be a
> reference to a relative file of the same name. For example, using the code block mentioned
> previously, `./Profile.gql`.

### Self References

It's possible to create recursive structures using the `self` property, which refers to the current
schematic in which it was defined. When using self, the `reference` property and the `references`
map is not required.

```json
{
  "node": {
    "type": "reference",
    "self": true
  }
}
```

```graphql
type Schema {
  node: Schema
}
```

### Exported Schemas

When generating schema classes using the `--schemas` CLI option, all references defined in a
schematic are considered a relation (ORM style), and in turn, will generate schemas as well. To
disable this export from occurring, set `export` to false.

```json
{
  "node": {
    "type": "reference",
    "reference": "field",
    "export": false
  }
}
```

> Disabling exports are not supported by GraphQL.

### Relation Type

When generating schema classes, like above, a reference attribute can define the type of relation it
has with the parent schema, using ORM styled terminology, and the `relation` property.

The following relation types are supported, which are based on the `Schema`
[class constants](./schema.md): `hasOne`, `hasMany`, `belongsTo`, and `belongsToMany` (many to
many).

```json
{
  "node": {
    "type": "reference",
    "reference": "field",
    "relation": "belongsTo"
  }
}
```

> Customizing the relation type is not supported by GraphQL.

## Polymorphic

A `polymorph` type can be used for polymorphic relations through a union of possible types. When a
polymorph is defined, for example `item` (which points to a type within the union), an associated
`item_id` (the foreign key) and `item_type` (the name of a model or class) are also defined.

The possible values within a polymorphic relation must be a [shape reference](#shape-references) or
standard [reference](#references) definition. Furthermore, each value requires a `name`, which is
the name of the model/class/type/etc used for the association.

```json
{
  "item": {
    "type": "polymorph",
    "valueTypes": [
      {
        "type": "shape",
        "name": "Model::Image",
        "reference": "Image"
      },
      {
        "type": "reference",
        "name": "Video",
        "reference": "Video"
      }
    ]
  }
}
```

This transpiles down to:

```javascript
// PropTypes
item: PropTypes.oneOfType([
  ImageShape.isRequired,
  VideoShape.isRequired,
]).isRequired,
item_id: KeyShape.isRequired,
item_type: PropTypes.string.isRequired,

// Flow
item: Image | Shape,
item_id: Key,
item_type: string,

// TypeScript
item: Image | Shape;
item_id: Key;
item_type: string;
```

The `_id` and `_type` suffixes can be configured with `keySuffix` and `typeSuffix` respectively.
Furthermore, the `export` field is also supported.

```json
{
  "type": "shape",
  "name": "Model.Image",
  "reference": "Image",
  "keySuffix": "_fk",
  "typeSuffix": "_model",
  "export": false
}
```

Alias names: `poly`, `morph`

> Polymorphs are not supported by GraphQL.

## Instance Ofs

The `instance` type provides a mechanism for comparing a value to an object (class, function, etc)
found in JavaScript. While this doesn't necessarily map to a database table, it does provide an easy
way to map to something like a model in the application.

The instance type requires a `contract` property, which is the name of the object.

```json
{
  "model": {
    "type": "instance",
    "contract": "UserModel"
  }
}
```

For the most part, this feature must be used in unison with [imports](#imports), as to pull the
object into scope.

```json
{
  "imports": [{ "default": "UserModel", "path": "../models/UserModel" }]
}
```

This transpiles down to:

```javascript
import UserModel from '../models/UserModel';

// PropTypes
model: PropTypes.instanceOf(UserModel).isRequired,

// Flow
model: UserModel,

// TypeScript
model: UserModel;
```

Alias names: `inst`

> Instance Ofs are not supported by GraphQL.
