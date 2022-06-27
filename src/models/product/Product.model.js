import ProductSchema from "./Product.schema.js";

export const insertProduct = (obj) => {
  return ProductSchema(obj).save();
};

export const getProduct = (filter) => {
  return ProductSchema.findOne(filter);
};

export const getMultipleProduct = (filter) => {
  return ProductSchema.find(filter);
};

export const updateProduct = (filter, updateObj) => {
  return ProductSchema.findOneAndUpdate(filter, updateObj);
};

export const updateProductById = (_id, updateObj) => {
  return ProductSchema.findOneAndUpdate(_id, updateObj);
};

export const deleteProduct = (filter) => {
  return ProductSchema.findOneAndDelete(filter);
};

export const deleteMultiProducts = (ids) => {
  return ProductSchema.deleteMany({ _id: { $in: ids } });
};
