import { ObjectType, Field, Root, Ctx } from 'type-graphql';
import { Node } from './Node';
import {
  Context,
  RawPerson
} from '../types';
import { PersonUtils } from '../utils/PersonUtils';

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

  @Field(type => Boolean)
  _entity(
    @Root() root: Person & RawPerson,
    @Ctx() { dataSources }: Context
  ) {
    const { id } = PersonUtils.fromGlobalId(root.id);
    const { peopleApi } = dataSources;
    const person = peopleApi.getPerson(id);

    Object.assign(root, {
      ...person,
      id: root.id
    });

    return true;
  }
}