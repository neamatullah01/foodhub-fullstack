import app from "./app";

const PORT = process.env.PORT || 5000;

// 1. Only listen on a port if we are running locally
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

// 2. Export the app so Vercel can run it as a serverless function
export default app;
