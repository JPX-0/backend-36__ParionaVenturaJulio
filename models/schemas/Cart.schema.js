import mongoose from "mongoose";
const Schema = mongoose.Schema;

const CartSchema = new Schema({
  author: {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true },
    location: { type: String, required: true },
    phone: { type: String, required: true },
  },
  products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
  createdAt: { type: Date, required: true },
  updatedAt: { type: Date, required: true }
});

export default CartSchema;