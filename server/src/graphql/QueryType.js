import { GraphQLObjectType } from 'graphql';
import { nodeField } from '../modules/node/definitions';
import { ListItemsQuery, GetItemQuery } from '../modules/item/ItemQuery';
import { MeQuery } from '../modules/user/UserQuery';

const QueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'The root of all queries',
  fields: () => ({
    node: nodeField,
    me: MeQuery,
    items: ListItemsQuery,
    item: GetItemQuery,
  }),
});

export default QueryType;
