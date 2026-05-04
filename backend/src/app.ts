import "dotenv/config";
import express from "express";
import cors from "cors";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";
import { mealRouter } from "./modules/meal/meal.route";
import { providerProfileRouter } from "./modules/providerProfile/providerProfile.route";
import { categoryRouter } from "./modules/category/category.route";
import { orderRouter } from "./modules/order/order.route";
import { reviewRouter } from "./modules/review/review.route";
import { userRouter } from "./modules/user/user.route";
import { adminRouter } from "./modules/admin/admin.route";

const app = express();

app.set("trust proxy", 1);

app.use(
  cors({
    origin: "https://foodhub-delivery.vercel.app",
    credentials: true,
  }),
);

// Configure CORS to allow both production and Vercel preview deployments
// const allowedOrigins = [
//   process.env.APP_URL || "http://localhost:4000",
//   process.env.PROD_APP_URL, // Production frontend URL
//   "http://localhost:3000",
//   "http://localhost:4000",
//   "http://localhost:5000",
// ].filter(Boolean); // Remove undefined values

// app.use(
//   cors({
//     origin: (origin, callback) => {
//       // Allow requests with no origin (mobile apps, Postman, etc.)
//       if (!origin) return callback(null, true);

//       // Check if origin is in allowedOrigins or matches Vercel preview pattern
//       const isAllowed =
//         allowedOrigins.includes(origin) ||
//         /^https:\/\/next-blog-client.*\.vercel\.app$/.test(origin) ||
//         /^https:\/\/.*\.vercel\.app$/.test(origin); // Any Vercel deployment

//       if (isAllowed) {
//         callback(null, true);
//       } else {
//         callback(new Error(`Origin ${origin} not allowed by CORS`));
//       }
//     },
//     credentials: true,
//     methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
//     allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
//     exposedHeaders: ["Set-Cookie"],
//   }),
// );

// app.use(
//   cors({
//     origin: process.env.APP_URL, // client side url
//     credentials: true,
//   }),
// );

app.all("/api/auth/*splat", toNodeHandler(auth));

app.use(express.json());
app.use("/api/users", userRouter);

app.use("/api/admin", adminRouter);

app.use("/api/providers", providerProfileRouter);

app.use("/api/categories", categoryRouter);

app.use("/api/meals", mealRouter);

app.use("/api/orders", orderRouter);

app.use("/api/reviews", reviewRouter);

app.get("/", (req, res) => {
  res.send("FoodHub API running...");
});

export default app;
