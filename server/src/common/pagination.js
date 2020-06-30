import { Schema } from 'mongoose';

const { ObjectId } = Schema.Types;

function limitQueryWithId(query, before, after, order) {
  const filter = {
    _id: {},
  };

  if (before) {
    const op = order === 1 ? '$lt' : '$gt';
    filter._id[op] = ObjectId(before.value);
  }

  if (after) {
    const op = order === 1 ? '$gt' : '$lt';
    filter._id[op] = ObjectId(after.value);
  }

  return query.find(filter).sort([['_id', order]]);
}

async function limitQuery(query, field, order, before, after) {
  let filter = {};
  const limits = {};
  const ors = [];
  if (before) {
    const op = order === 1 ? '$lt' : '$gt';
    const beforeObject = await query.findOne(
      {
        _id: ObjectId(before.value),
      },
      {
        fields: {
          [field]: 1,
        },
      },
    );
    limits[op] = beforeObject[field];
    ors.push({
      [field]: beforeObject[field],
      _id: { [op]: ObjectId(before.value) },
    });
  }

  if (after) {
    const op = order === 1 ? '$gt' : '$lt';
    const afterObject = await query.findOne(
      {
        _id: ObjectId(after.value),
      },
      {
        fields: {
          [field]: 1,
        },
      },
    );
    limits[op] = afterObject[field];
    ors.push({
      [field]: afterObject[field],
      _id: { [op]: ObjectId(after.value) },
    });
  }

  if (before || after) {
    filter = {
      $or: [
        {
          [field]: limits,
        },
        ...ors,
      ],
    };
  }

  return query.find(filter).sort([
    [field, order],
    ['_id', order],
  ]);
}

async function applyPagination(query, first, last) {
  let count;
  const options = {};

  if (first || last) {
    count = await query.estimatedDocumentCount();

    console.log({ estimatedDocumentCount: count });

    let limit;
    let skip;

    if (first && count > first) {
      limit = first;
    }

    if (last) {
      if (limit && limit > last) {
        skip = limit - last;
        limit -= skip;
      } else if (!limit && count > last) {
        skip = count - last;
      }
    }

    if (skip) options.skip = skip;
    if (limit) options.limit = limit;
  }

  return {
    options,
    pageInfo: {
      hasNextPage: Boolean(first && count > first),
      hasPreviousPage: Boolean(last && count > last),
    },
  };
}

export async function paginate(
  Model,
  { first, last, before, after },
  orderField,
  order,
) {
  const query = Model;
  // if (orderField === 'id') {
  //   query = limitQueryWithId(query, before, after, order);
  // } else {
  //   query = await limitQuery(query, orderField, order, before, after);
  // }
  return applyPagination(query, first, last);
}
