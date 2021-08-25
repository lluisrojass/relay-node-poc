import { DataSource } from 'apollo-datasource';
import StarWars01 from '../data/movies/starwars_01.json';
import StarWars02 from '../data/movies/starwars_02.json';
import StarWars03 from '../data/movies/starwars_03.json';
import {
  RawMovie,
  IMoviesApi
} from '../types';

export class MoviesApi extends DataSource implements IMoviesApi<{}> {
  private allMovies: RawMovie[] = [
    StarWars01,
    StarWars02,
    StarWars03,
  ];

  getMovie(movieId: number | string): RawMovie | undefined {
    const movie = this.allMovies.find(movie => String(movie.id) === String(movieId));
    return !movie ? movie : JSON.parse(JSON.stringify(movie));
  }

  getAllMovies(): RawMovie[] {
    return this.allMovies
      .map(movie => JSON.parse(JSON.stringify(movie)));
  }
}