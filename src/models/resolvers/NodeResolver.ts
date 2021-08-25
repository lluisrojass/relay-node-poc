import { Arg, ID, Query, Resolver } from "type-graphql";
import { Node } from '../Node';
import { fromGlobalId } from 'graphql-relay';

Resolver(of => Node)
export class NodeResolver {
  @Query(type => Node)
  node(@Arg('id', () => ID, { nullable: false }) id: string) {
    const { type } = fromGlobalId(id);
    return {
      _type: [type[0].toUpperCase(), ...type.slice(1)].join(''),
      id
    };
  }
};
