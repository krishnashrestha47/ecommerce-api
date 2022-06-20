import ProductSchema from "./Product.schema";

const insertProduct = (obj) => {
  return ProductSchema(obj).save();
};

const getProduct = (filter) => {
  return ProductSchema.findOne(filter);
};

const getMultipleProduct = (filter) => {
  return ProductSchema.find(filter);
};

const updateProduct = (filter, updateObj) => {
  return ProductSchema.findOneAndUpdate(filter, updateObj);
};

const deleteProduct = (filter) => {
  return ProductSchema.findOneAndDelete(filter);
};
