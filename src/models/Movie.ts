import { ObjectType, Field, Ctx, Root } from "type-graphql";
import { Context, RawMoviePersonType, RawMovie } from "../types";
import { Node } from './Node';
import { fromGlobalId } from "graphql-relay";
import { CrewMember } from "./CrewMember";
import { Character } from './Character';
import { CharacterUtils } from '../utils/CharacterUtils';
import { CrewMemberUtils } from '../utils/CrewMemberUtils';
import { MovieUtils } from "../utils/MovieUtils";

@ObjectType({ implements: Node })
export class Movie extends Node {
  @Field()
  title!: string;

  @Field()
  plotSummary!: string;

  @Field()
  storyline!: string;

  @Field({ nullable: false })
  mpaaRating!: string;

  @Field({ nullable: false })
  releaseYear!: number;

  @Field({ nullable: false })
  ratingPercent!: number;

  @Field({ nullable: false })
  runtimeInSeconds!: number;

  @Field(type => [CrewMember])
  crew(
    @Root() movie: Movie,
    @Ctx() { dataSources }: Context,
  ) {
    const { id: globalMovieId } = movie;
    const { id } = fromGlobalId(globalMovieId);
    const { moviePeopleApi } = dataSources;

    const movieCrewMembers = moviePeopleApi.getMoviePeople(
      id, 
      RawMoviePersonType.crew
    );

    return movieCrewMembers.map(crewMember => ({
      ...crewMember,
      id: CrewMemberUtils.toGlobalId(crewMember)
    }));
  }

  @Field(type => [Character])
  cast(
    @Root() movie: Movie,
    @Ctx() { dataSources }: Context,
  ) {
    const { id: globalMovieId } = movie;
    const { id } = fromGlobalId(globalMovieId);
    const { moviePeopleApi } = dataSources;

    const movieCastPeople = moviePeopleApi.getMoviePeople(
      id, 
      RawMoviePersonType.cast
    );
    
    return movieCastPeople.map(castMember => ({
      ...castMember,
      id: CharacterUtils.toGlobalId(castMember)
    }));
  }

  @Field(type => Boolean)
  _entity(
    @Root() parent: Movie & RawMovie,
    @Ctx() { dataSources }: Context
  ) {
    const { id: globalId } = parent;
    const { id } = MovieUtils.fromGlobalId(globalId);
    const { moviesApi } = dataSources;
    const movie = moviesApi.getMovie(id);

    Object.assign(parent, {
      ...movie,
      id: parent.id
    });

    return true;
  }
};
