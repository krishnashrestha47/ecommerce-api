import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    status: "success",
    message: "GET, got hit to admin router",
  });
});

router.post("/", (req, res) => {
  console.log(req.body);
  res.json({
    status: "success",
    message: "POST got hit to admin router",
  });
});

router.patch("/", (req, res) => {
  res.json({
    status: "success",
    message: "PATCH got hit to admin router",
  });
});

export default router;
