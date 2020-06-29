import { GraphQLSchema } from 'graphql';
import QueryType from './QueryType';
import MutationType from './MutationType';

export const schema = new GraphQLSchema({
  query: QueryType,
  mutation: MutationType,
});

// export default buildSchema(`
//   interface Node {
//     id: ID!
//   }

//   enum ItemType  {
//     GUN
//     ARMOR
//   }

//   type Item implements Node {
//     id: ID!
//     name: String!
//     price: Int!
//     type: ItemType
//   }

//   input FindItemInput {
//     id: ID
//     name: String
//   }

//   type Query {
//     node(id: ID!): Node
//     items: [Item]!
//     item(input: FindItemInput): Item!
//   }
// `);
