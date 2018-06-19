# Auto-Transpilation

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
[options passed to the command line](./README.md#options).

- `schematicsSource` (string | string[]) - Absolute file system path to schematics source folder.
  _Required._
- `schematicsImportPath` (string) - The fake import path to intercept. Defaults to
  `shapeshifter/schematics`.
- `defaultNullable`
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

## Webpack

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

## Browserify, Gulp, Grunt

Looking into...
