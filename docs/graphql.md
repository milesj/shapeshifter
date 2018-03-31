# GraphQL Support

Shapeshifter supports reading from GraphQL (`.gql`) type files -- if you prefer GraphQL over
JavaScript/JSON. However, since GraphQL is a rather strict and direct representation of a data
model, only a small subset of Shapeshifter functionality is available.

When defining a GraphQL schematic, multiple definitions (`type`, `enum`, `union`, etc) can exist in
a single schematic, with the last `type` definition being used as the schematic representation. All
prior definitions will be used as internal shapes, references, enums, and unions.

For more guidance,
[take a look at our test cases.](https://github.com/milesj/shapeshifter/tree/master/tests/schemas/gql)

> Introspection support being looked into!
