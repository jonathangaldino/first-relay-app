import gql from 'graphql-tag';

export default gql`
  interface Node {
    id: ID!
  }

  enum ItemType  {
    GUN
    ARMOR
  }

  type Item implements Node {
    id: ID!
    name: String!
    price: Int!
    type: ItemType
  }

  type Query {
    node(id: ID!): Node
    items: [Item]!
    item(id: ID!): Item!
  }
`;
