import { config } from "dotenv";
import express from "express";
import { connectDB } from "./config/db.js";
import errorHandler from "./middleware/errorHandler.middleware.js";
import authRoutes from "./routes/auth.routes.js";
import privateRoutes from "./routes/private.route.js";
import { authenticate } from "./middleware/auth.middleware.js";
import cors from "cors";
import cookieParser from "cookie-parser";

config();

const app = express();

const corsOptions = {
  origin: process.env.CLIENT_URI,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(cookieParser());

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api", authenticate, privateRoutes);
app.use(errorHandler);

connectDB();
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
