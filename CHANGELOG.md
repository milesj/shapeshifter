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
