import express from "express";
import cors from "cors";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";
import { mealRouter } from "./modules/meal/meal.route";
import { providerProfileRouter } from "./modules/providerProfile/providerProfile.route";

const app = express();

app.use(
  cors({
    origin: process.env.APP_URL, // client side url
    credentials: true,
  }),
);
app.use(express.json());

app.all("/api/auth/*splat", toNodeHandler(auth));

app.use("/api/meals", mealRouter);

app.use("/api/providers", providerProfileRouter);

app.get("/", (req, res) => {
  res.send("FoodHub API running...");
});

export default app;
