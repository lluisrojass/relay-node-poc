import { toGlobalId } from "graphql-relay";
import { ObjectType, Field, Root, Ctx } from "type-graphql";
import { 
  RawMoviePerson, 
  RawMoviePersonType, 
  RawMoviePersonJob, 
  Context
} from "../types";
import { Node } from './Node';
import { Person } from './Person';
import { CrewMemberUtils } from "../utils/CrewMemberUtils";

@ObjectType({ implements: Node })
export class CrewMember extends Node {
  @Field(type => RawMoviePersonJob, { nullable: false })
  job(@Root() root: CrewMember & RawMoviePerson): RawMoviePersonJob {
    return root.role.job;
  }

  @Field(type => RawMoviePersonType, { nullable: false })
  type(@Root() root: CrewMember & RawMoviePerson) {
    return root.role.type;
  }

  @Field(type => Person)
  person(
    @Root() root: CrewMember & RawMoviePerson,
    @Ctx() { dataSources }: Context
    ) {
    const { personId } = root;
    const { peopleApi } = dataSources;

    const person = peopleApi.getPerson(String(personId));
    if (!person) throw new Error(
      `Unable to find ` + 
      `person for character ` + 
      `with id \`${personId}\``);

    return {
      ...person,
      id: toGlobalId('Person', String(person.id))
    }
  }

  @Field(type => Boolean)
  _entity(
    @Root() root: Person & RawMoviePerson,
    @Ctx() { dataSources }: Context
  ) {
    const { personId, movieId } = CrewMemberUtils.fromGlobalId(root.id);
    const { moviePeopleApi } = dataSources;
    const castMember = moviePeopleApi.getMoviePerson(
      movieId,
      personId, 
      RawMoviePersonType.crew
    );

    Object.assign(root, {
      ...castMember,
      id: root.id
    });

    return true;
  }
}