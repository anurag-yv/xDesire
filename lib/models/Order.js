import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  userEmail: String,
  items: [
    {
      productId: String,
      name: String,
      price: Number,
      qty: Number,
      image: String,
    },
  ],
  total: Number,
  status: { type: String, default: "Pending" },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);
