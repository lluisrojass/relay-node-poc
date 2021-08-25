# relay-node-poc

# What is this?
This is a Graph with entities that adhere to [Relay Object Spec](https://relay.dev/graphql/objectidentification.htm). It's built using `type-graphql`, `Apollo` and `Express`. It's built to explore a way to delegate entity resolution responsibilities to respective entities. Not only would this allow us to co-locate responsibilities, it would reduce complexity involved in adding entites to a graph. This repo attempts to do this by returning an empty metadata object in the `node()` resolver, which would then handoff resolution to concrete types, where we seek to modify the root element with real entity data. Invoke the request in `exmamples/singlePerson.gql` and note that the `isHuman` property is a consequence of the `birthdaySerialized` resolver. If you remove `birthdaySerialized` from the query you receive an error. If you take a look at the field resolver for `birthdaySerialized` you can see why.  
  
The idea is to leverage this algorithm, but for entity resolutions. the `node()` query returns two things, a hidden, private property called `_type` and an echo of the `id` parameter it received. The `_type` property is to suppress entity checks inside `graphql-js` by forcing GraphQL to trust us on the type info being returned by the `node()` query. I've added a new property on the `Movie` model called `_entity`, which preforms the entity lookup.  
# Caveats
1. The `type` in the internal relay ID **has** to match the Capitalized GraphQL entity `type`.   
1. There would need to be consideration taken if we ever enter a world where global ids are a functioning hybrid of UUIDs and `relay` constructed IDs.  
2. All consumers are responsible to include the `_entity` property in their queries, otherwise they will clearly encounter an error.
3. There might be adverse ramifications stemming from the hack in the Node abstract class, which is necessary to get this to work. 


# Scripts 
`dev` - run the server in development mode