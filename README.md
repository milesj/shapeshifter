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

```
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

```
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

```
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

TODO

### Schema Structure

TODO

#### Attributes

The `attributes` object represents a mapping of field names to
[type definitions](#attribut-types). Attributes are usually a
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
property name.

Required attributes are not supported by Flow, instead it supports
`null`. Nullable fields will prepend `?` to every type alias.

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
    { "path": "../baz/qux.js": "default": "BarClass", "named": ["className"] }
]
```

#### Constants

The `constants` object is a mapping of constant to a primitive
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

TODO

#### Primitives

TODO

#### Arrays

TODO

#### Objects

TODO

#### Instances

TODO

#### Enums

TODO

#### Shapes

TODO

#### Unions

TODO

#### References

TODO
