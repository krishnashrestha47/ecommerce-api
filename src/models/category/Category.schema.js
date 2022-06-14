import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema(
  {
    status: {
      type: String,
      default: "inactive", //either active or inactive
    },
    catName: {
      type: String,
      maxlength: 100,
      required: true,
    },
    slug: {
      type: String,
      unique: true,
      index: 1,
      maxlength: 100,
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
