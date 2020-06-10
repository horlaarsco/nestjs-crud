import * as mongoose from 'mongoose';

export const ProductSchema = new mongoose.Schema({
  name: { type: String, required: [true, 'Name Required gan'] },
  desc: { type: String, required: [true, 'Desc Required gan'] },
  price: Number,
  created_at: { type: Date, default: Date.now },
});
