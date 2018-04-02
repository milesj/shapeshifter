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
}
```

* `relationTypes` (object) - Maps attribute names to relation types. A relation type is one of the
  following constants found on the `Schema` class: `HAS_ONE`, `HAS_MANY`, `BELONGS_TO`,
  `BELONGS_TO_MANY`, `MORPH_TO`, and `MORPH_TO_MANY`.

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
schemas) are highly informational. Relations are divided into 4 categories: has one, has many,
belongs to, and belongs to many (many to many).

Relations are generated based on [references](#references) found within the current schema. Assume
we add a has many `posts` relation, and a has one `country` relation to the current `users` schema,
we would generate the following output.

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

### Polymorphism

Schemas support a rudimentary form of polymorphism through relations. When an attribute is defined,
for example `item` (which points to another record/schema), an associated `item_id` (the foreign
key) and `item_type` (the name of a model or class) are also defined.

The generated output would look something like the following.

```js
import Schema from 'shapeshifter';

export const attachmentSchema = new Schema('attachments');

export const ownerSchema = new Schema('owners');

export const postSchema = new Schema('posts');

attachmentSchema.morphTo({
  owner: ownerSchema, // User, Bot, etc
});

post.morphToMany({
  attachments: attachmentSchema, // Image, PDF, etc
});
```

If `--use-define` is passed on the command line, we need to use the `morph` function exported
alongside the `Schema`.

```javascript
import Schema, { morph } from 'shapeshifter';

// ...

attachmentSchema.define({
  owner: morph(ownerSchema),
});

post.define({
  attachments: morph([attachmentSchema]),
});
```

> The foreign key and type field suffixes can be customized with `morphForeignKeySuffix` and
> `morphTypeSuffix` metadata fields, respectively.
