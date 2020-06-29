import { nodeDefinitions, fromGlobalId } from 'graphql-relay';

import ItemModel from '../item/ItemModel';

export const { nodeInterface, nodeField } = nodeDefinitions(
  async globalId => {
    const { type, id } = fromGlobalId(globalId);

    if (type === 'Item') {
      return ItemModel.findById(id);
    }

    return null;
  },
  obj => {
    if (obj.type) return 'Item';

    return null;
  },
);
