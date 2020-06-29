import { Schema, model } from 'mongoose';

const ItemSchema = new Schema(
  {
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
  }
);

const Item = model('Item', ItemSchema);

export default Item;