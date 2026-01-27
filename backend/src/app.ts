import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express());

app.get("/", (req, res) => {
  res.send("FoodHub API running...");
});

export default app;
