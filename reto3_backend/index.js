import { ApolloServer, gql } from "apollo-server";

const preguntas = [
  {
    pregunta: "¿Porque elegiste la programacion como carrera?",
    status: false,
    nro: 1,
    id: "3d594650-3436-11eb-bc57-8b80ba54c431",
  },
  {
    pregunta: "¿Te concideras una persona proactiva?",
    status: false,
    nro: 2,
    id: "3d594650-3436-11eb-bc57-8b80ba54c432",
  },
  {
    pregunta: "Menciona tu mayor debilidad y las concecuencias de este",
    status: false,
    nro: 3,
    id: "3d594650-3436-11eb-bc57-8b80ba54c433",
  },
  {
    pregunta: "Menciona tu mayor fortaleza y los beneficios que te puede traer",
    status: false,
    nro: 4,
    id: "3d594650-3436-11eb-bc57-8b80ba54c434",
  },
];

const typeDefs = gql`
  type Pregunta {
    pregunta: String!
    status: Boolean!
    nro: Int!
    id: ID!
  }

  type Mutation {
    changeStatus(nro: Int!): Pregunta
  }

  type Query {
    findPregunta(nro: Int!): Pregunta
    allPreguntas: [Pregunta]!
  }
`;

const resolvers = {
  Query: {
    findPregunta: (root, args) => {
      const { nro } = args;
      return preguntas.find((e) => e.nro === nro);
    },
    allPreguntas: () => {
      return preguntas;
    },
  },
  Mutation: {
    changeStatus: (root, args) => {
      const preguntaIndex = preguntas.findIndex((e) => e.nro === args.nro);
      if (preguntaIndex === -1) return null;

      const pregunta = preguntas[preguntaIndex];

      const updatedPregunta = { ...pregunta, status: true };
      preguntas[preguntaIndex] = updatedPregunta;
      return updatedPregunta;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
