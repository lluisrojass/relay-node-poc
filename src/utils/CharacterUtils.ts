import { fromGlobalId, toGlobalId } from 'graphql-relay';
import {
  RawMoviePerson,
  PublicEntities
} from '../types';

export class CharacterUtils {
  static fromGlobalId(globalId: string) {
    const { id, type } = fromGlobalId(globalId);
    const [movieId, personId] = id.split(':');
  
    if (!movieId || !movieId.length || !personId || !personId.length) {
      throw new Error(
        `Unable to derive local ` + 
        `id for Character with global ` + 
        `id of \`${globalId}\``
      );
    }

    return {
      movieId,
      personId,
      type
    };
  }

  static toGlobalId(moviePerson: RawMoviePerson) {
    const compoundId = [moviePerson.movieId, moviePerson.personId].join(':');
    return toGlobalId(PublicEntities.CHARACTER, compoundId);
  }
}