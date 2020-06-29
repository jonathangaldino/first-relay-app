import { nodeDefinitions, fromGlobalId } from 'graphql-relay';

import ItemServices from '../item/ItemServices';

export const { nodeInterface, nodeField } = nodeDefinitions(
  async globalId => {
    const { type, id } = fromGlobalId(globalId);

    if (type === 'Item') {
      return ItemServices.getItem(id);
    }

    return null;
  },
  obj => {
    if (obj.type) return 'Item';

    return null;
  },
);
