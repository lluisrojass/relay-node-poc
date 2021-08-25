import { Field, InterfaceType, ID } from 'type-graphql';

@InterfaceType({
  resolveType: (value) => value._type
})
export abstract class Node {
  @Field(type => ID)
  id!: string;
}