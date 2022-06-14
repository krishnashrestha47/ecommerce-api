import CategorySchema from "./Category.schema";

export const insertCategory = (obj) => {
  return CategorySchema(obj).save();
};

export const getACategories = (filter) => {
  return CategorySchema.findOne(filter);
};

export const getCategories = (filter) => {
  return CategorySchema.find(filter);
};

export const deleteCatById = (_id) => {
  return CategorySchema.findByIdAndDelete(_id);
};

// @ _id is string, @updateObj must be an object
export const updateCategoryById = (_id, updateObj) => {
  return CategorySchema.findByIdAndUpdate(_id, updateObj);
};
