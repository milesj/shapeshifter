# Schema Classes

Schema classes are ES based classes that are generated and included in the output when `--schemas`
is passed on the command line. These schemas provide basic attribute and relational support, which
in turn can be used by consuming libraries through exports.

Using our users example from the intro, and the `--schemas` CLI options, we would get the following
output.

```javascript
export const userSchema = new Schema('users', 'id');
```

The following properties are available on the `Schema` class instance.

* `resourceName` (string) - The resource name of the schema, passed as the first argument to the
  constructor. This field is based on `meta.resourceName` in the schematic file.
* `primaryKey` (string|string[]) - The name of the primary key in the current schema, passed as the
  second argument to the constructor. Compound keys can be supported by passing an array of
  attribute names. This field is based on `meta.primaryKey` in the JSON schematic file. Defaults to
  "id".
* `attributes` (string[]) - List of attribute names in the current schema.
* `metadata` (object) - Extra metadata defined in the current schema.
* `relations` (object[]) - List of relational objects that map specific attributes to externally
  referenced schemas. The relational object follows this structure:

```javascript
{
  attribute: 'foo',         // Field name
  schema: schemaInstance,   // Reference schema class
  relation: Schema.HAS_ONE, // Relation type
  collection: false,        // Is it an array?
  polymorph: {
    keySuffix: '_id',
    type: 'ModelName',
    typeSuffix: '_type',
  },
}
```

* `relationTypes` (object) - Maps attribute names to relation types. A relation type is one of the
  following constants found on the `Schema` class: `HAS_ONE`, `HAS_MANY`, `BELONGS_TO`,
  `BELONGS_TO_MANY`, and `MORPH_TO`.

> Schemas are not supported by GraphQL.

## Attributes

By default, attributes are excluded from the output unless the `--attributes` CLI option is passed.
Once passed, they are defined as a list of strings using `addAttributes()`.

Continuing with our previous example, the output will be.

```javascript
export const userSchema = new Schema('users', 'id');

userSchema.addAttributes(['id', 'username', 'email', 'location']);
```

## Relations

Unlike attributes, relations are always included in the output, as relations between entities (via
schemas) are highly informational. Relations are divided into 5 categories: has-one, has-many,
belongs-to, belongs-to-many (many to many), and [polymorphic](#polymorphic) (below).

Relations are generated based on [references](./definitions.md#references) found within the current
schema. Assume we add a has-many `posts` relation, and a has-one `country` relation to the current
`users` schema, we would generate the following output.

```javascript
import Schema from 'shapeshifter';

export const countrySchema = new Schema('countries');

export const postSchema = new Schema('posts');

export const userSchema = new Schema('users');

postSchema.belongsTo({
  user: userSchema,
});

userSchema
  .hasOne({
    country: countrySchema,
  })
  .hasMany({
    posts: postSchema,
  });
```

If `--use-define` is passed on the command line, the relation output will be modified to:

```javascript
postSchema.define({
  user: userSchema,
});

userSchema.define({
  country: countrySchema,
  posts: [postSchema],
});
```

## Polymorphic

Schemas support a rudimentary form of polymorphism through relations and the
[polymorph](./definitions.md#polymorphic) type. When a polymorph is defined, something like the
following would be generated, with the object being a map of all variant types, and the associated
attribute name.

```js
attachmentSchema.morphTo(
  {
    Image: imageSchema,
    Video: videoSchema,
    PDF: pdfSchema,
  },
  'item',
);
```

Type name and foreign key suffixes are customized with additional arguments.

```js
attachmentSchema.morphTo(schemas, 'item', '_model', '_uuid');
```

> Polymorphic relations do not support the shorthand define syntax when using `--use-define`.
