import { 
  DataSource,
} from 'apollo-datasource';

export interface RawMovie {
  id: number | string;
  title: string;
  plotSummary: string;
  storyline: string;
  mpaaRating: string;
  releaseYear: number;
  ratingPercent: number;
  runtimeInSecond: number;
};

export enum RawMoviePersonType {
  cast = 'cast',
  crew = 'crew'
};

export enum RawMoviePersonJob {
  actor = 'actor',
  director = 'director'
};

export interface RawMoviePersonRole {
  type: RawMoviePersonType
  job: RawMoviePersonJob
};

export interface RawCharacter {
  firstName: string;
  lastName: string;
};

export interface RawMoviePerson {
  movieId: number;
  personId: number;
  role: RawMoviePersonRole;
  character: RawCharacter 
};

export interface RawBirthday {
  day: number;
  month: number;
  year: number; 
};

export interface RawPerson {
  id: number | string; 
  firstName: string;
  lastName: string;
  birthday: RawBirthday;
}

export interface IMoviePeopleApi<T> extends DataSource<T> {
  getMoviePerson(
    movieId: string,
    personId: string,
    roleType?: RawMoviePersonType
  ): RawMoviePerson | undefined;
  getMoviePeople(
    movieId: string,
    roleType: RawMoviePersonType
  ): RawMoviePerson[];
}

export interface IMoviesApi<T> extends DataSource<T> {
  getMovie(movieId: number | string): RawMovie | undefined;
  getAllMovies(): RawMovie[];
}

export interface IPeopleApi<T> extends DataSource<T> {
  getPerson(id: string): RawPerson | undefined;
  getAllPeople(): RawPerson[];
} 

export interface AppDataSources<T> {
  moviePeopleApi: IMoviePeopleApi<T>;
  moviesApi: IMoviesApi<T>;
  peopleApi: IPeopleApi<T>;
  [name: string]: DataSource<T>;
}

export interface Context<T = {}> {
  dataSources: AppDataSources<T>;
};

export const enum PublicEntities {
  PERSON = 'Person',
  CREW_MEMBER = 'CrewMember',
  CHARACTER = 'Character',
  MOVIE = 'Movie'
};