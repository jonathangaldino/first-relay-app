import { armors, guns } from '../data/items';
import { nodeField } from './nodeDefinition';

export const root = {
  // Node: {
  //   __resolveType(obj) {
  //     console.log('obj', obj)
  //     if (obj.price) return 'Item';

  //     return null;
  //   },
  // },

  node: () => nodeField,

  items: () => ([...guns, ...armors]),
  item: (_parent, { input: { id, name } }, _ctx) => {
    if (!id && !name) {
      throw new Error('Must provide name or id*');
    }

    let item;

    if (name) {
      item = [...guns, ...armors].find(i => i.name === name);
    } else {
      const [gun] = guns;
      item = gun;
    }

    if (!item) {
      throw new Error('Item not found');
    }

    return item;
  },
};
