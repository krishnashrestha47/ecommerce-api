import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema(
  {
    catName: {
      type: String,
      maxlength: 100,
      required: true,
    },
    parentCatId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Category", CategorySchema);
