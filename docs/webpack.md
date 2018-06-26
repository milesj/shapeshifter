# Webpack Auto-Transpilation

By default, Shapeshifter transpiles schematics to a target folder through a manual CLI script. This
can be problematic, as the command may incur VCS conflicts, or simply, developers will forget to run
the command. To mitigate this issue, an auto-transpilation Webpack plugin can be added to your
build/bundle process.

```
yarn add shapeshifter-webpack --dev
// Or
npm install shapeshifter-webpack --save-dev
```

```javascript
const ShapeshifterPlugin = require('shapeshifter-webpack').default;

// Webpack config
plugins: [
  new ShapeshifterPlugin({
    schematicsSource: path.join(__dirname, 'src/schemas'),
  }),
],
```

This plugin will intercept the import path below and replace the source with the transpiled
Shapeshifter output.

```javascript
import { userSchema } from 'shapeshifter/schematics';
```

The plugin accepts an object with the following options -- with most of them being based on the
[options passed to the command line](./README.md#options).

- `schematicsSource` (string | string[]) - Absolute file system path to schematics source folder.
  _Required._
- `schematicsImportPath` (string) - The fake import path to intercept. Defaults to
  `shapeshifter/schematics`.
- `defaultNullable`
- `defaultOptional`
- `disableEslint`
- `importPath`
- `includeAttributes`
- `includeDefinitions`
- `includeSchemas`
- `indentCharacter`
- `inferPropTypesShape`
- `renderers`
- `stripPropTypes`
- `useDefine`
