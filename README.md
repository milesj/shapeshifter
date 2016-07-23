# Shapeshifter v1.0.0
[![Build Status](https://travis-ci.org/milesj/shapeshifter.svg?branch=master)](https://travis-ci.org/milesj/shapeshifter)

Shapeshifter is a command line tool for generating ES2015 compatible
files that export React prop types, Flow type aliases, or TypeScript
interfaces from JSON schema files. Schemas can represent database
tables, API endpoints, data structures, resources, internal shapes,
and more.

Take this user schema for example.

```json
{
    "name": "User",
    "attributes": {
        "id": "number",
        "username": "string",
        "email": {
            "type": "string",
            "required": true
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
import { PropTypes } from 'react';

export const UserSchema = PropTypes.shape({
    id: PropTypes.number,
    username: PropTypes.string,
    email: PropTypes.string.isRequired,
    location: PropTypes.shape({
        lat: PropTypes.number,
        long: PropTypes.number,
    }),
});
```

Or the following Flow type aliases.

```javascript
// @flow

export type UserSchema = {
    id: number,
    username: string,
    email: string,
    location: {
        lat: number,
        long: number,
    },
};
```

Or lastly, TypeScript interfaces.

```javascript
export interface UserSchema {
    id?: number;
    username?: string;
    email: string;
    location?: {
        lat?: number;
        long?: number;
    };
}
```

## Requirements

* ES2015
* Node 4+
* React 14+ / Flow 0.20+ / TypeScript 1.6+

## Installation

```
npm install shapeshifter --save-dev
```

## Usage

Shapeshifter is provided as a binary which can be executed like so.

```
shapeshifter [options] [input] > [output]
```

The binary input accepts either a single schema file or a directory of
schema files. If a directory is provided, they will be combined into
a single output.

By default, the binary will send output to stdout, which can then be
redirected to a destination of your choosing, otherwise the output
will be sent to the console.

### Options

`--help`, `-h` - Displays a help menu.

`--nullable`, `-n` - Marks all attributes as nullable by default.
Defaults to false. (Flow only)

`--required`, `-r` - Marks all attributes as required by default.
Defaults to false. (React and TypeScript only)

`--indent` - Defines the indentation characters to use in the
generated output. Defaults to 2 spaces.

`--format` - The format to output to. Accepts "react", "flow", or
"typescript". Defaults to "react".

`--suffix` - The suffix to append to all type definitions. Defaults
to "Suffix".

## Documentation

* [Schema Structure](#schema-structure)
    * [Attributes](#attributes)
    * [Subsets](#subsets)
    * [Imports](#imports)
    * [Constants](#constants)
* [Attribute Types](#attribute-types)
    * [Primitives](#primitives)
    * [Arrays](#arrays)
    * [Objects](#objects)
    * [Enums](#enums)
    * [Shapes](#shapes)
    * [Unions](#unions)
    * [References](#references)
    * [Instance Ofs](#instance-ofs)

### Schema Structure

A schema can either be a JSON file, or a JavaScript file
that exports an object (Node.js compatible). JSON is preferred
as it's a consumable format across many languages.

Every schema requires a `name` and `attributes` property.
The name is used to denote the name of the export found in the
ES2015 transpiled output file, while the attributes denote the
available fields in the current schema.

```json
{
    "name": "Users",
    "attributes": {}
}
```

Furthermore, a schema supports the following optional properties:
`imports`, `constants`, and `subsets`. Continue reading for more
information on all the supported schema properties.

#### Attributes

The `attributes` object represents a mapping of field names to
[type definitions](#attribute-types). Attributes are usually a
one-to-one mapping of database table columns or data model attributes.

The value of a field, the type definition, represents what type of
data this value expects to be. This definition can either be a string
of the name of a [primitive type](#primitives), or an object with
a required `type` property, which can be the name of any type.

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

##### Modifiers

All attribute type definitions support two modifier properties,
`required` and `null`. Both of these values accept a boolean value.

When `required` is used by React, it will append `isRequired` to all
prop types. When used by TypeScript, it will omit `?` on every
property name. Required attributes are not supported by Flow,
instead it supports `null`. Nullable fields will prepend `?` to
every type alias.

```json
"field": {
    "type": "string",
    "required": true,
    "null": false
}
```

#### Subsets

The `subsets` object allows for smaller sets of attributes to be
defined and exported in the ES2015 output. Each key in the object
represents a unique name for the subset, while the value of each
property can either be an array of [attribute names](#attributes),
or an object of `attributes`, `required` (optional), and `null`
(optional) properties.

Unlike `required` and `null` properties found on type definitions,
these properties represent a mapping of attributes in the current
subset to boolean values, which enable or disable the modifier.

```json
"subsets": {
    "SetA": ["foo", "bar"],
    "SetB": {
        "attributes": ["foo", "qux"],
        "null": {
            "foo": true
        }
    },
    "SetC": {
        "attributes": ["bar", "baz"],
        "required": {
            "bar": true,
            "baz": false
        }
    }
},
"attributes": {
    "foo": "number",
    "bar": "bool",
    "baz": {
        "type": "string",
        "required": true
    },
    "qux": {
        "type": "string",
        "null": true
    }
}
```

#### Imports

The `imports` array provides a mechanism for defining ES2015 imports,
which in turn allow re-use of application level structures.

An import object requires a `path` property that maps to a file
in the application relative to the transpiled schema. Default imports
can be defined with the `default` property, while named imports
can be defined with `named` (an array).

```json
"imports": [
    { "path": "./foo.js", "default": "FooClass" },
    { "path": "../bar.js", "named": ["funcName", "constName"] },
    { "path": "../baz/qux.js", "default": "BarClass", "named": ["className"] }
]
```

#### Constants

The `constants` object is a mapping of a constant to a primitive
value or an array of primitive values. Constants are transpiled
down to exported ES2015 `const`s, allowing easy re-use of values.

The primary use case of this feature is to provide constants from a
backend model layer that can easily be used on the frontend,
without introducing duplication.

```json
"constants": {
    "STATUS_PENDING": 0,
    "STATUS_ACTIVE": 1,
    "STATUSES": [0, 1],
    "ADMIN_FLAG": "admin"
}
```

### Attribute Types

For every attribute defined in a schema, a type definition is required.
The following types are supported.

#### Primitives

There are 3 primitive types, all of which map to native JavaScript
primitives. They are `string`, `number`, and `boolean`. Primitives
are the only types that support shorthand notation.

```json
"name": "string",
"status": "number",
"active": "boolean",
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

Alias names: `str`, `num`, `int`, `integer`, `float`, `bool`

#### Arrays

An `array` is a dynamic list of values, with the type of the value
defined by the `valueType` property.

```json
"messages": {
    "type": "array",
    "valueType": {
        "type": "string"
    }
}
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

Alias names: `list`

#### Objects

An `object` maps key-value pairs through the `keyType` and `valueType`
properties -- both of which are type definitions. When transpiling down
to React, the `keyType` is not required.

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

#### Enums

An `enum` is a fixed list of values, with both the values and the value
type being defined through the `values` and `valueType` properties
respectively.

```json
"words": {
    "type": "enum",
    "valueType": "string",
    "values": ["foo", "bar", "baz"]
}
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

#### Shapes

TODO

#### Unions

TODO

#### References

TODO

#### Instance Ofs

The `instance` type provides a mechanism for comparing a value to
an object (class, function, etc) found in JavaScript. While this
doesn't necessarily map to a database table, it does provide an easy
way to map to something like a model in the application.

The instance type requires a `contract` property, which is the name
of the object.

```json
"model": {
    "type": "instance",
    "contract": "UserModel"
}
```

For the most part, this feature must be used in unison with
[imports](#imports), as to pull the object into scope.

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

## FAQ

**Why `arrayOf`, `objectOf` over `array`, `object` React prop types?**

I chose `arrayOf` and `objectOf` because they provide type safety and
the assurance of the values found within the collection. Using
non-type safe features would defeat the purpose of this library.

**What about `node`, `element`, and `func` React prop types?**

The `node` and `element` types represent DOM elements or React
structures found within the application. These types don't really
map to database tables or data structures very well, if at all.

The same could be said for `func` -- however, that is supported.
I've simply opted out in mentioning it in the documentation, as I'm
not too sure on its use case. Kind of a hidden feature really.
