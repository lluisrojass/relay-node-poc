import { Node } from './Node';
import { ObjectType, Field, Root, Ctx } from 'type-graphql';
import { Person } from './Person';
import { Context, RawMoviePerson, RawPerson, RawMoviePersonType, RawMoviePersonJob } from '../types';
import { CharacterUtils } from '../utils/CharacterUtils';
import { PersonUtils } from '../utils/PersonUtils';

@ObjectType({ implements: Node })
export class Character extends Node {
  @Field(type => RawMoviePersonJob, { nullable: false })
  job(@Root() root: RawMoviePerson & Character): RawMoviePersonJob {
    return root.role.job;
  }

  @Field(type => RawMoviePersonType, { nullable: false })
  type(@Root() root: RawMoviePerson & Character) {
    return root.role.type;
  }

  @Field(type => String, { nullable: false })
  firstName(
    @Root() root: RawMoviePerson & Character
  ) {
    return root.character.firstName;
  }

  @Field(type => String, { nullable: false })
  lastName(
    @Root() root: RawMoviePerson & Character
  ) {
    return root.character.lastName;
  }

  @Field(type => Person, { nullable: false })
  person(
    @Ctx() { dataSources }: Context,
    @Root() root: Character & Character
  ): RawPerson {
    const { id } = root;
    const { personId } = CharacterUtils.fromGlobalId(id);
    const { peopleApi } = dataSources;
    const person = peopleApi.getPerson(personId);

    if (!person) throw new Error(
      `Unable to find person ` + 
      `for character with ` + 
      `id \`${id}\``);

    return {
      ...person,
      id: PersonUtils.toGlobalId(person)
    };
  }
};