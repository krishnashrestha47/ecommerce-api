// This file is like a model file

import axios from "axios";

export const getCustomers = (id) => {
  const customerUrl = id
    ? "https://jsonplaceholder.typicode.com/users/" + id
    : "https://jsonplaceholder.typicode.com/users/";
  return axios.get(customerUrl);
};
