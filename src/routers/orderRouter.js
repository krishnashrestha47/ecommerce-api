import express from "express";

const router = express.Router();

const ordersArg = [
  {
    _id: "1",
    status: "processing", //processing, completed, cancelled
    buyer: {
      buyer: "Malvern Star 100",
      buyerId: "12", //_id of the user
      fName: "Sulav",
      lName: "",
      email: "12k",
      phone: "12k",
    },
    cart: [
      {
        productId: "12",
        productName: "Malvern Star 100",
        salesPrice: "5",
        thumbnail: "http://",
        subTotal: 333,
      },
    ],
    cartTotal: "adf",
    discount: "50",
    discountCode: "50",
    totalAmount: "54",
    paymentInfo: {
      status: "pending", //pending or paid
      method: "cash on pickup",
      paidAmount: "453",
      transactionId: "asdf",
      paidDate: "10/10/2021",
    },
  },
  {
    _id: "1",
    status: "cancelled", //processing, completed, cancelled
    buyer: {
      buyer: "Malvern Star 100",
      buyerId: "12", //_id of the user
      fName: "Dipak",
      lName: "",
      email: "12k",
      phone: "12k",
    },
    cart: [
      {
        productId: "12",
        productName: "Malvern Star 100",
        salesPrice: "5",
        thumbnail: "http://",
        subTotal: 333,
      },
    ],
    cartTotal: "adf",
    discount: "50",
    discountCode: "50",
    totalAmount: "54",
    paymentInfo: {
      status: "paid", //pending or paid
      method: "cash on pickup",
      paidAmount: "453",
      transactionId: "asdf",
      paidDate: "10/10/2021",
    },
  },
  {
    _id: "1",
    status: "cancelled", //processing, completed, cancelled
    buyer: {
      buyer: "Malvern Star 100",
      buyerId: "12", //_id of the user
      fName: "Krishna",
      lName: "",
      email: "12k",
      phone: "12k",
    },
    cart: [
      {
        productId: "12",
        productName: "Malvern Star 100",
        salesPrice: "5",
        thumbnail: "http://",
        subTotal: 333,
      },
    ],
    cartTotal: "adf",
    discount: "50",
    discountCode: "50",
    totalAmount: "54",
    paymentInfo: {
      status: "paid", //pending or paid
      method: "cash on pickup",
      paidAmount: "453",
      transactionId: "asdf",
      paidDate: "10/10/2021",
    },
  },
];

router.get("/:_id?", (req, res, next) => {
  try {
    const { _id } = req.params;

    const orders = _id
      ? ordersArg.filter((item) => item._id === _id)
      : ordersArg;

    res.json({
      status: "success",
      message: "Customer List",
      orders,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
