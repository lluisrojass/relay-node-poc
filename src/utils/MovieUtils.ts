import { fromGlobalId, toGlobalId } from 'graphql-relay';
import {
  PublicEntities,
  RawMovie
} from '../types';

export class MovieUtils {
  static fromGlobalId = fromGlobalId;

  static toGlobalId(movie: RawMovie) {
    return toGlobalId(PublicEntities.MOVIE, String(movie.id));
  }
}