import {
  Context
} from '../../types';
import {
  Ctx,
  Resolver,
  Query,
  ID,
  Arg
} from 'type-graphql';
import {
  Person
} from '../Person';
import { PersonUtils } from '../../utils/PersonUtils';

@Resolver(of => Person)
export class PeopleResolver {
  @Query(returns => [Person],  { nullable: false }) 
  getAllPeople(@Ctx() { dataSources }: Context) {
    const { peopleApi } = dataSources;
    const people = peopleApi.getAllPeople();
    return people.map(person => ({
      ...person,
      id: PersonUtils.toGlobalId(person)
    }))
  }

  @Query(returns => Person,  { nullable: true }) 
  getPerson(
    @Ctx() { dataSources }: Context,
    @Arg('id', () => ID, { nullable: false }) globalId: string
  ) {
    const { peopleApi } = dataSources;
    const { id } = PersonUtils.fromGlobalId(globalId)
    const person = peopleApi.getPerson(id);

    if (!person) throw new Error('Could not find person for \`id\`');

    return {
      ...person,
      id: PersonUtils.toGlobalId(person)
    }
  }
}