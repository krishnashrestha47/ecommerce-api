import mongoose from "mongoose";

const PaymentMethodSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      default: "inactive", //either active or inactive
    },

    name: {
      type: String,
      unique: true,
      index: 1,
      maxlength: 100,
      required: true,
    },
    description: {
      type: string,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Payment_method", PaymentMethodSchema);