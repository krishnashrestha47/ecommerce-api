import PaymentMethodSchema from "./PaymentMethod.schema.js";

export const insertPaymentMethod = (obj) => {
  return PaymentMethodSchema(obj).save();
};

export const getAPaymentMethod = (filter) => {
  return PaymentMethodSchema.findOne(filter);
};

export const getAllPaymentMethods = () => {
  return PaymentMethodSchema.find();
};
export const getPaymentMethods = (filter) => {
  return PaymentMethodSchema.find(filter);
};

export const deleteCatById = (_id) => {
  return PaymentMethodSchema.findByIdAndDelete(_id);
};

// @ _id is string, @updateObj must be an object
export const updatePaymentMethodById = (_id, updateObj) => {
  return PaymentMethodSchema.findByIdAndUpdate(_id, updateObj, { new: true });
};
