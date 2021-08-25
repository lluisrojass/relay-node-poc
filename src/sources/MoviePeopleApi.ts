import moviePeople from "../data/connections/movies_to_people.json";
import {
  IMoviePeopleApi,
  RawMoviePerson,
  RawMoviePersonType
} from '../types';
import { DataSource } from "apollo-datasource";

export class MoviePeopleApi extends DataSource implements IMoviePeopleApi<{}> {
  getMoviePerson(
    movieId: string,
    personId: string,
    roleType?: RawMoviePersonType
  ): RawMoviePerson | undefined {
    const moviePerson = moviePeople.find(moviePerson => (
      String(moviePerson.movieId) === movieId &&
      String(moviePerson.personId) === personId && 
      moviePerson.role.type === roleType
    ));

    return !moviePerson
      ? moviePerson
      : JSON.parse(JSON.stringify(moviePerson));
  };

  getMoviePeople(
    movieId: string,
    roleType?: RawMoviePersonType
  ): RawMoviePerson[] {
    const people = moviePeople
      .filter(person => (
        String(person.movieId) === movieId && 
        person.role.type === roleType
      ));

    return people;
  }
}