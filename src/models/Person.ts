import { ObjectType, Field, Root } from 'type-graphql';
import { Node } from './Node';
import {
  RawPerson
} from '../types';

@ObjectType({ implements: Node })
export class Person extends Node {
  @Field({ nullable: false })
  firstName!: string;

  @Field({ nullable: false })
  lastName!: string;

  @Field({ nullable: false}) 
  isHuman!: boolean;

  @Field(type => String)
  birthdaySerialized(@Root() root: RawPerson & Person) {
    const {
      month,
      day,
      year
    } = root.birthday;

    Object.assign(root, { isHuman: false });
    return [day, month, year].join('/');
  }
}