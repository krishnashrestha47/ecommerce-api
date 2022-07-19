import express from "express";

const router = express.Router();

const reviews = [
  {
    _id: "1",
    productId: "12",
    productName: "Malvern Star 100",
    rating: "5",
    reviewedBy: "Krishna",
    reviewedById: "12k",
  },
  {
    _id: "1",
    productId: "12",
    productName: "Malvern Star 100",
    rating: "5",
    reviewedBy: "Krishna",
    reviewedById: "k1",
  },
  {
    _id: "2",
    productId: "122",
    productName: "Malvern Star 500",
    rating: "4",
    reviewedBy: "Prem",
    reviewedById: "p1",
  },
  {
    _id: "3",
    productId: "21",
    productName: "Malvern Star 123",
    rating: "1",
    reviewedBy: "Dipak",
    reviewedById: "d1",
  },
  {
    _id: "4",
    productId: "6",
    productName: "Malvern Star 321",
    rating: "5",
    reviewedBy: "Sulav",
    reviewedById: "s1",
  },
];

router.get("/:_id?", (req, res, next) => {
  try {
    const { _id } = req.params;

    const result = _id ? reviews.filter((item) => item._id === _id) : reviews;

    res.json({
      status: "success",
      message: "Customer List",
      result,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
