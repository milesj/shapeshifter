# Schematic Structure

Shapeshifter is powered by files known as schematics, which can be a JSON (`.json`), JavaScript
(`.js`), YAML (`.yml`), or GraphQL (`.gql`) file. Schematics must define a name, used to denote the
name of the export, and set of attributes, used as as fields in which the schematic is defining.

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
> [GraphQL](./graphql.md), and read the documentation thoroughly, for more information.

## Attributes

The `attributes` object represents a mapping of fields to [type definitions](./definitions.md).
Attributes are usually a one-to-one mapping of database table columns or data model attributes.

The value of a field, the type definition, represents what type of data this value expects to be.
This definition can either be a string of the name of a
[primitive type](./definitions.md#primitives), or an object with a required `type` property, which
can be the name of any type.

Depending on the type used, additional properties may be required.

```json
{
  "attributes": {
    "primitiveField": "string",
    "compoundField": {
      "type": "enum",
      "valueType": "number",
      "values": [1, 2, 3]
    }
  }
}
```

> For GraphQL, attributes are analogous to
> [fields](https://facebook.github.io/graphql/#sec-Language.Fields).

### Nullable

All attribute type definitions support the `nullable` modifier, which accepts a boolean value, and
triggers the following:

* Flow: Nullable fields will prepend `?` to each type.
* PropTypes: Non-nullable fields will append `isRequired` to the prop type.
* TypeScript: Nullable fields will append `| null` to each type. Best used with
  `--strictNullChecks`.

```json
{
  "field": {
    "type": "string",
    "nullable": false
  }
}
```

If using GraphQL, all attributes are nullable by default. To mark a field as non-nullable, append an
exclamation mark (`!`) to the type.

```graphql
field: String!
```

## Metadata

The `meta` object allows arbitrary metadata to be defined. Only two fields are supported currently,
`primaryKey` and `resourceName`, both of which are used when generating `Schema` classes using
`--schemas`. The `primaryKey` defines the unique identifier / primary key of the record, usually
"id" (default), while `resourceName` is the unique name found in a URL path. For example, in the URL
"/api/users/123", the "users" path part would be the resource name, and "123" would be the primary
key.

```json
{
  "meta": {
    "primaryKey": "id",
    "resourceName": "users"
  }
}
```

Compound keys are supported by passing an array of attribute names.

```json
{
  "meta": {
    "primaryKey": ["start_date", "end_date"],
    "resourceName": "calendar"
  }
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

## Imports

The `imports` array provides a mechanism for defining ES imports, which in turn allow re-use of
application level structures.

An import object requires a `path` property that maps to a file in the application, relative to the
transpiled schema. Default imports can be defined with the `default` property, while named imports
can be defined with `named` (an array).

```json
{
  "imports": [
    { "path": "./foo.js", "default": "FooClass" },
    { "path": "../bar.js", "named": ["funcName", "constName"] },
    { "path": "../baz/qux.js", "default": "BarClass", "named": ["className"] }
  ]
}
```

> Imports are not supported by GraphQL.

## Constants

The `constants` object is a mapping of a constant to a primitive value or an array of primitive
values. Constants are transpiled down to exported ES `const`s, allowing easy re-use of values.

The primary use case of this feature is to provide constants from a backend model layer that can
easily be used on the frontend, without introducing duplication.

```json
{
  "constants": {
    "STATUS_PENDING": 0,
    "STATUS_ACTIVE": 1,
    "STATUSES": [0, 1],
    "USER_FLAG": "admin"
  }
}
```

> Constants are not supported by GraphQL.

## Subsets

The `subsets` object allows for smaller sets of attributes to be defined and exported in the ES
output. Each key in the object represents a unique name for the subset, while the value of each
property can either be an array of [attribute names](#attributes), or an object of `attributes` and
`nullable` (optional) properties.

Unlike `nullable` properties found on type definitions, this property represents a mapping of
attributes in the current subset to boolean values, which enable or disable the modifier.

```json
{
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
}
```

> Subsets are not supported by GraphQL.
