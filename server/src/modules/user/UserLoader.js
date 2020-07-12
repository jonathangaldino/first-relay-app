/* eslint-disable import/no-unresolved */

import Dataloader from 'dataloader';
import { mongooseLoader } from '@entria/graphql-mongoose-loader';
import UserModel from './UserModel';

export const getLoader = () =>
  new Dataloader(ids => mongooseLoader(UserModel, ids));

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
    const data = await ctx.dataloaders.UserLoader.load(id);

    if (!data) {
      return null;
    }

    return data;
  } catch (err) {
    return null;
  }
};
