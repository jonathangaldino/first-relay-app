import { GraphQLObjectType } from 'graphql';
import { nodeField } from '../modules/node/definitions';
import { ListItemsQuery } from '../modules/item/ItemQuery';

const QueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'The root of all queries',
  fields: () => ({
    node: nodeField,
    items: ListItemsQuery,
  }),
});

export default QueryType;
