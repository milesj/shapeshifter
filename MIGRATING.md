# 3.0.0
In previous versions of Shapeshifter, there were `null` and `required` type definition properties.
The `null` property was only used by Flow, which would prepend `?` to types to allow nulls. The
`required` property was used by React to append `isRequired` to prop types, and by TypeScript
to append `?` to interface properties.

In 3.0.0, both of these fields were merged into a single `nullable` property. Because of this,
some of the logic in previous formats has been reversed. Furthermore, this was exacerbated by
the `--nullable` command line option. Depending on whether that option is passed on the command
line, determines how to migrate properly. To rectify this problem, please follow these suggestions:

## Common migration changes
* Remove `func` and `function` type definitions from all schematics.
* If importing files:
  * Rename `SchemaReader` to `Schematic`.
  * Rename `Factory.definition` to `DefinitionFactory.factory`.
  * Rename `Factory.renderer` to `RendererFactory.factory`.

## If every attribute SHOULD BE required
* Do not pass `--nullable` on the command line.
* Remove `"required": true` from all schematics.
* Remove `"null": false` from all schematics.
* Rename `"required": false` to `"nullable": true` in all schematics.
* Rename `"null": true` to `"nullable": true` in all schematics.

## If every attribute SHOULD NOT BE required
* Pass `--nullable` on the command line.
* Remove `"required": false` from all schematics.
* Remove `"null": true` from all schematics.
* Rename `"required": true` to `"nullable": false` in all schematics.
* Rename `"null": false` to `"nullable": false` in all schematics.

## TypeScript support
Nullable/required support was entirely removed from TypeScript generated files and schematics.
To support nullable types, please use TypeScript's built-in `--strictNullChecks` option.
