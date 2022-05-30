import "dotenv/config";
import express from "express";

const app = express();

import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";

const PORT = process.env.PORT || 8000;

// use middlewares

app.use(express.json()); //parse req.body data
app.use(cors()); //call api from different resources
app.use(helmet()); //help prevent about 60-70% of attack by default
app.use(morgan("dev"));

//mongoDB connect
import { dbConnect } from "./src/config/dbConfig.js";
dbConnect();

// routers

app.get("/", (req, res) => {
  res.json({
    message: "You have reached the admin API",
  });
});

// error handling
app.use((err, req, res, next) => {
  console.log(err);
  res.json({
    satus: "error",
    message: err.message,
  });
});

// bound app with the port to serve on internet
app.listen(PORT, (error) => {
  error
    ? console.log(error)
    : console.log(`Server is running on http://localhost:${PORT}`);
});
