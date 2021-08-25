import { fromGlobalId, toGlobalId } from 'graphql-relay';
import {
  PublicEntities,
  RawPerson
} from '../types';

export class PersonUtils {
  static fromGlobalId = fromGlobalId;

  static toGlobalId(person: RawPerson) {
    return toGlobalId(PublicEntities.PERSON, String(person.id));
  }
}