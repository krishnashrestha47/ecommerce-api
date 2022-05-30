import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      default: "inactive",
    },
    fName: {
      type: String,
      required: true,
      trim: true,
      maxlength: [20, "First name must be less than 20 characters"],
    },
    lName: {
      type: String,
      required: true,
      trim: true,
      maxlength: [20, "First name must be less than 20 characters"],
    },
    dob: {
      type: Date,
      default: null,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      maxlength: [50, "Email must be less than 50 characters"],
      unique: true,
      index: 1,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
      maxlength: [15, "phone number must be less than 15 characters"],
      maxlength: [10, "phone number must atleast 10 characters"],
    },
    password: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      default: "n/a",
    },
  },
  { timestamps: true }
);

export default mongoose.model("admin", AdminSchema);
