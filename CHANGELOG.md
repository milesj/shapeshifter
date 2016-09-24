# 2.2.2
* Added flowtype definitions to the `libs/` output folder.
* Updated develop dependency TypeScript to v2.0.

# 2.2.1
* Fixed an issue in which relations were being output multiple times.

# 2.2.0
* Updated references to toggle schema exporting via the `export` property.
* Updated references to choose the relation type when schema exporting.
* Fixed issues with self reference schema exports.
* Fixed issues with circular references.

# 2.1.0
* Added `belongsTo()` and `belongsToMany()` to `Schema`.
* Added `collection` boolean to the schema relation object.
* Fixed the lib build process.

# 2.0.0
* Added new `--schemas`, `--attributes`, and `--types` options to the CLI.
* Added new entity schema mapping through the new `Schema` class.
  * Can be included in the output by passing `--schemas`.
  * Provides basic relational mapping based on references.
* Updated old type definitions to require `--types`.
* Removed `suffix` customization.
  * React type suffix is now `Shape`.
  * Flow type suffix is now `Type`.
  * TypeScript type suffix is now `Interface`.
* Removed global `config.js` object file. Configuration options are now
  passed down from the command line to the transpiler.
* Renamed previous `Schema` class to `SchemaReader`.
* Refactored how object name formatting worked.

# 1.2.0
* Added support for `self` (recursive) references.

# 1.1.0
* TypeScript enum names are automatically generated.

# 1.0.0
* Initial release!
