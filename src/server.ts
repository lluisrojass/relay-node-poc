import "reflect-metadata";
import { buildSchema } from 'type-graphql';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { AppDataSources } from './types';
import { MoviesApi } from "./sources/MoviesApi";
import { MoviePeopleApi } from './sources/MoviePeopleApi';
import { PeopleApi } from './sources/PeopleApi';
import { MovieResolver, NodeResolver, PeopleResolver } from './models/resolvers'; 
import bootstrapTypeGraphql from './bootstrap';

(async () => {
  bootstrapTypeGraphql();
  const app = express();
  const schema = await buildSchema({
    resolvers: [NodeResolver, MovieResolver, PeopleResolver],
    emitSchemaFile: true
  });

  
  const server = new ApolloServer({
    schema,
    dataSources: (): AppDataSources<{}> => ({
      moviesApi: new MoviesApi(),
      moviePeopleApi: new MoviePeopleApi(),
      peopleApi: new PeopleApi()
    })
  });

  await server.start();
  server.applyMiddleware({ app });
  app.listen({ port: 8000 }, () => {
    console.log('(√) Server ready at http://localhost:8000');
  });
})();