import SessionSchema from "./SessionSchema";

export const insertSession = (obj) => {
  return SessionSchema(obj).save();
};

export const getSession = (filter) => {
  return SessionSchema.fineOne(filter);
};

export const deleteSession = (filter) => {
  return SessionSchema.findOneAndDelete(filter);
};
