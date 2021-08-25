import { RawPerson, IPeopleApi } from "../types";
import { DataSource } from "apollo-datasource";
import EwanMcgregor from '../data/people/ewan_mcgregor.json';
import GeorgeLucas from '../data/people/george_lucas.json';
import NataliePortman from '../data/people/natalie_portman.json';
import LiamNeeson from '../data/people/liam_neeson.json';

export class PeopleApi extends DataSource implements IPeopleApi<{}> {
  private people: RawPerson[] = [
    EwanMcgregor,
    GeorgeLucas,
    NataliePortman,
    LiamNeeson
  ];

  getPerson(id: string): RawPerson | undefined {
    const person = this.people.find(person => String(person.id) === id);
    return !person ? person : JSON.parse(JSON.stringify(person));
  }

  getAllPeople(): RawPerson[] {
    return this.people
      .map(person => JSON.parse(JSON.stringify(person)));
  }
}