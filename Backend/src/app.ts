import { config } from "dotenv";
import express from "express";
import { connectDB } from "./config/db.js";
import errorHandler from "./middleware/errorHandler.middleware.js";
import authRoutes from "./routes/auth.routes.js";
import privateRoutes from "./routes/task.route.js";
import { authenticate } from "./middleware/auth.middleware.js";
import cors from "cors";
import http from "http";
import cookieParser from "cookie-parser";
import { initSocket } from "./utils/socket.js";
import "./utils/scheduleOverdueTask.js";

config();

const app = express();
const server = http.createServer(app);

const corsOptions = {
  origin: process.env.CLIENT_URI,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());

initSocket(server);
app.use("/api/auth", authRoutes);
app.use("/api", authenticate, privateRoutes);
app.use(errorHandler);

connectDB();
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
