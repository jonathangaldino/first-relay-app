/* eslint-disable import/no-unresolved */
import Dataloader from 'dataloader';
import {
  mongooseLoader,
  connectionFromMongoCursor,
} from '@entria/graphql-mongoose-loader';
import ItemModel from './ItemModel';

export const getLoader = () =>
  new Dataloader(ids => mongooseLoader(ItemModel, ids));

/**
 *
 * @param {*} ctx GraphQLContext
 * @param {*} id DataLoaderKey
 */
export const load = async (ctx, id) => {
  if (!id) {
    return null;
  }

  try {
    const data = await ctx.dataloaders.ItemLoader.load(id);

    if (!data) {
      return null;
    }

    return data;
  } catch (err) {
    return null;
  }
};

export const loadItems = async (ctx, args) => {
  const conditions = {};

  if (args.name) {
    const searchNameRegex = new RegExp(args.name, 'i');
    conditions.name = { $regex: searchNameRegex };
  }

  return connectionFromMongoCursor({
    cursor: ItemModel.find(conditions).sort({ createdAt: -1 }),
    context: ctx,
    args,
    loader: load,
  });
};
