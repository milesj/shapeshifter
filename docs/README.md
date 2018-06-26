# Shapeshifter

Shapeshifter is a command line tool for generating ECMAScript (ES) compatible files that export
PropTypes, Flow aliases, or TypeScript interfaces, as well as relation schema classes from JSON or
GraphQL schematic files. Schematics can represent database tables, API endpoints, data structures,
resources, internal shapes, and more.

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

Which transpiles down to the following PropTypes.

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

Or the following Flow aliases.

```javascript
/* @flow */

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
  email: string | null;
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

- Node 4+
- PropTypes 15+ / Flow 0.60+ / TypeScript 2.4+
- IE 10+

## Installation

Shapeshifter can be used as a dev dependency if you're only generating type definitions (shapes,
aliases, interfaces, etc).

```
yarn add shapeshifter --dev
// Or
npm install shapeshifter --save-dev
```

If you're generating schema classes, it will need to be a normal dependency.

```
yarn add shapeshifter
// Or
npm install shapeshifter --save
```

### Parsers

By default, Shapeshifter will parse `.json` or `.js` files. It can parse the following file types by
installing additional dependencies.

- [GraphQL](https://github.com/milesj/shapeshifter/tree/master/packages/parser-graphql)
- [YAML](https://github.com/milesj/shapeshifter/tree/master/packages/parser-yaml)

## Usage

Shapeshifter is provided as a binary which can be executed and piped like so.

```
shapeshifter [options] <input> > <output>
```

The binary input accepts either a single schematic file, a directory of schematic files, or multiple
files. If a directory is provided, they will be combined into a single output.

By default, the binary will send output to stdout, which can then be redirected to a destination of
your choosing, otherwise the output will be sent to the console.

### Options

- `--attributes` (bool) - Include an attribute list in the schema class export. Defaults to "false".
- `--definitions` (bool) - Include type annotations and definitions in the output. Defaults to
  "false".
- `--disable-eslint` (bool) - Prepend an eslint-disable comment to the top of the output. Defaults
  to "false".
- `--flow` (bool) - Generate Flow definitions. Defaults to "false".
- `--indent` (string) - Defines the indentation characters to use in the generated output. Defaults
  to 2 spaces.
- `--infer-prop-types-shape` (bool) - When both `prop-types` and `typescript` definitions are used,
  the TypeScript interface can be named to match the PropTypes shape, allowing for automatic type
  inference. Defaults to "false". _(TypeScript and Flow only)_
- `--import` (string) - The import path to a `Schema` class, inserted at the top of every output
  file. Defaults to "shapeshifter".
- `--nullable` (bool) - Marks all attributes as nullable by default. Not applicable to GraphQL.
  Defaults to false.
- `--prop-types` (bool) - Generate PropTypes definitions. Defaults to "false".
- `--schemas` (bool) - Include schema class exports in the output. Defaults to "false".
- `--schema-generics` (bool) - Explicity type generic callsites for schemas. Defaults to "false".
  _(TypeScript only)_
- `--strip-prop-types` (bool) - Wrap PropType definitions in `process.env.NODE_ENV` production
  expressions, allowing them to be removed with dead code elimination.
- `--typescript` (bool) - Generate TypeScript definitions. Defaults to "false".
- `--use-define` (bool) - Update all schema relations to use `Schema#define`.
