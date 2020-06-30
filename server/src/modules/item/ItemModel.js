import { Schema, model } from 'mongoose';

const ItemSchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: ['GUN', 'ARMOR'],
    },
  },
  {
    timestamps: true,
    collection: 'items',
  },
);

ItemSchema.index({ name: 'text' });

const ItemModel = model('Item', ItemSchema);

export default ItemModel;
