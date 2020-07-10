import { nodeDefinitions, fromGlobalId } from 'graphql-relay';

import UserModel from '../user/UserModel';
import ItemModel from '../item/ItemModel';

export const { nodeInterface, nodeField } = nodeDefinitions(
  async globalId => {
    const { type, id } = fromGlobalId(globalId);

    if (type === 'Item') {
      return ItemModel.findById(id);
    }
    if (type === 'User') {
      return UserModel.findById(id);
    }

    return null;
  },
  obj => {
    if (obj.type) return 'Item';
    if (obj.email) return 'User';

    return null;
  },
);
