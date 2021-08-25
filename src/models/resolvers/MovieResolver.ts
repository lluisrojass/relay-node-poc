import { Resolver, Ctx, Query, Arg, ID } from 'type-graphql';
import { Movie } from '../Movie';
import { Context } from '../../types';
import { MovieUtils } from '../../utils/MovieUtils';
import { RawMovie } from '../../types';

@Resolver(of => Movie)
export class MovieResolver {
  @Query(returns => Movie)
  getMovie(
    @Arg('movieId', () => ID, { nullable: false }) globalId: string,
    @Ctx() { dataSources }: Context
  ): RawMovie {
    const { moviesApi } = dataSources;
    const { id } = MovieUtils.fromGlobalId(globalId);
    const movie = moviesApi.getMovie(Number(id));

    if (!movie) throw new Error('Could not find movie for \`id\`');
    
    return {
      ...movie,
      id: globalId,
    };
  }

  @Query(returns => [Movie], { nullable: false })
  async getAllMovies(
    @Ctx() { dataSources }: Context
  ) {
    const { moviesApi } = dataSources;
    const movies = moviesApi.getAllMovies();
    return movies.map(movie => ({ 
      ...movie, 
      id: MovieUtils.toGlobalId(movie)
    }));
  }
}