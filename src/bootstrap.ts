import { registerEnumType } from 'type-graphql';
import { RawMoviePersonType, RawMoviePersonJob } from './types';

export default () => {
  registerEnumType(RawMoviePersonType, {
    name: 'MoviePersonType',
    description: 'Movie person types'
  });
  
  registerEnumType(RawMoviePersonJob, {
    name: 'MoviePersonJob',
    description: 'Movie person jobs'
  });
}