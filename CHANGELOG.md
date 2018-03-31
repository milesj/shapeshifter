# 6.0.0

#### 💥 Breaking

* React is now referred to as PropTypes.
* CLI script is now `shapeshifter` instead of `shapeshifter build`.
  * Options are now dashed instead of camel cased.
* Removed `-n` shorthand option.
* Removed `--format` option in favor of 3 individual options.
* Renamed `--types` option to `--definitions`.
* Renamed `Transpiler` and `WebpackPlugin` option `format` to `renderers`.
  * Accepts an array of renderer names (flow, prop-types, typescript).

#### 🚀 New

* Can now generate and include multiple renderers (typed languages) into the output.
  * Added individual options `--flow`, `--prop-types`, and `--typescript`, to opt into generation.
* Updated `WebpackPlugin` to support Webpack 4.

#### 🐞 Fixed

* Removed values from TypeScript string enums (will infer them instead).

#### 🛠 Internal

* Converted from Flow to TypeScript.
* Replaced Vorpal with Yargs.

# 5.1.0 - 11/10/17

#### 🚀 New

* The `eslint-disable` comment atop the output file is now controlled by a `--disableEslint` flag.

# 5.0.0 - 9/28/17

#### 💥 Breaking

* Transpiled schema instance variables are now in camel case form. `UserSchema` -> `userSchema`.

#### 🐞 Fixed

* Will now correctly call `process.exit()` when transpilation fails.

#### 🛠 Internal

* Integrated `optimal` for options validation.
* Moved Flowtype definitions to flow-typed/ folder.

# 4.2.1 - 7/2/17

* Fixed an issue with the lib/ build.

# 4.2.0 - 7/2/17

* Schematics can now be auto-transpiled through a build or bundle process.
* Added a new `WebpackPlugin` plugin for auto-transpilation.
* Added a new `importPath` option, allowing the output import to be customized.
* Added an `eslint-disable` comment to the top of the output file.

# 4.1.0 - 5/10/17

* Updated IE requirement to 10+.
* Updated to include src/ files in the published package.
* Updated `Relation.schema` Flowtype definition to be covariant and allow subclasses.
* Moved Flowtype definition to root of project.

# 4.0.0 - 4/17/17

* Updated React requirement to v15.5.
* Updated PropTypes to use the new `prop-types` package.
* Updated CLI to use Vorpal. Renamed script from `shapeshifter` to `shapeshifter build`.
* Updated `shapeshifter build` to accept multiple file paths when executing (will be concatenated).
* Updated the renderer to not throw errors when generating `Schema`s without a `meta.resourceName`.
* Added an "Automatically generated" comment to the top of the output file.
* Added `Schema#define`, allowing relations to be mapped using GraphQL styled syntax.
* Added a `--useDefine` flag that will use `Schema#define` while rendering.
* Added a `--stripPropTypes` flag that will wrap PropType definitions in `process.env.NODE_ENV`.

# 3.2.1 - 2/17/17

* Fixed an issue with the `graphql` dependency not being listed.

# 3.2.0 - 2/2/17

* Added compound key support. Simply pass an array of attribute names to `meta.primaryKey`.
* Updated `Renderer#formatValue` to accept an array of values, which internally calls `formatArray`.

# 3.1.0 - 1/30/17

* Extra metadata in the schematic `meta` field will now be passed to the `Schema` instance.
* Added `Schema#metadata` to hold the extra metadata object.
* Added `Renderer#renderPlainObject` for rendering plain JS objects.
* Updated shape references to throw an error if the shape definition does not exist.

# 3.0.0 - 1/16/17

* Added GraphQL support through the use of `.gql` files to read from (instead of JSON).
* Updated TypeScript requirement to v2.0 and Flowtype to v0.30.
* Replaced Mocha + Chai with Jest and increased code coverage to 100%.
* Merged `null` and `required` flags into a single `nullable` field used by all formats.
* Removed `function` type definition support.
* Removed `nullable` support from TypeScript; use TypeScript's `--strictNullChecks` instead.
* Renamed `SchemaReader` to `Schematic` and all instances of the word reader (like variables).
* Renamed and split `Factory` into `DefinitionFactory` and `RendererFactory`.
* Fixed an issue in which nullable flags could not be passed to enum value types.

# 2.3.0 - 12/16/16

* Added a new shape reference feature, which allows for local reusable shapes in a JSON schema.
* Updated the visuals of errors and stack traces on the command line.

# 2.2.2 - 9/23/16

* Added Flowtype definitions to the `libs/` output folder.
* Updated develop dependency TypeScript to v2.0.

# 2.2.1 - 9/12/16

* Fixed an issue in which relations were being output multiple times.

# 2.2.0 - 9/10/16

* Updated references to toggle schema exporting via the `export` property.
* Updated references to choose the relation type when schema exporting.
* Fixed issues with self reference schema exports.
* Fixed issues with circular references.

# 2.1.0 - 9/6/16

* Added `belongsTo()` and `belongsToMany()` to `Schema`.
* Added `collection` boolean to the schema relation object.
* Fixed the lib/ build process.

# 2.0.0 - 9/6/16

* Added new `--schemas`, `--attributes`, and `--types` options to the CLI.
* Added new entity schema mapping through the new `Schema` class.
  * Can be included in the output by passing `--schemas`.
  * Provides basic relational mapping based on references.
* Updated old type definitions to require `--types`.
* Removed `suffix` customization.
  * React type suffix is now `Shape`.
  * Flowtype type suffix is now `Type`.
  * TypeScript type suffix is now `Interface`.
* Removed global `config.js` object file. Configuration options are now passed down from the command
  line to the transpiler.
* Renamed previous `Schema` class to `SchemaReader`.
* Refactored how object name formatting worked.

# 1.2.0 - 7/31/16

* Added support for `self` (recursive) references.

# 1.1.0 - 7/22/16

* TypeScript enum names are automatically generated.

# 1.0.0 - 7/20/16

* Initial release!
