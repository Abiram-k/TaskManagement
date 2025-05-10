import { Server } from "socket.io";
import http from "http";
import { config } from "dotenv";
import jwt from "jsonwebtoken";
config();

let io: Server;
const userSocketMap = new Map<string, string>();

export function initSocket(server: http.Server) {
  io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URI,
      methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
      credentials: true,
    },
  });

  io.use((socket, next) => {
    const token = socket.handshake.auth.token;
    if (token) {
      jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET!,
        (err: any, decoded: any) => {
          if (err) {
            console.log("JWT verification failed:", err);
            return next(new Error("Authentication error"));
          }

          const userId = decoded?.userId;
          if (userId) {
            userSocketMap.set(userId, socket.id);
            console.log(`User ${userId} connected with socket ${socket.id}`);
            next();
          } else {
            next(new Error("User ID not found in token"));
          }
        }
      );
    } else {
      next(new Error("Authentication token missing"));
    }
  });

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("disconnect", () => {
      const userId = [...userSocketMap.entries()].find(
        ([_, socketId]) => socketId === socket.id
      )?.[0];
      if (userId) {
        userSocketMap.delete(userId);
        console.log(`User ${userId} disconnected.`);
      }
    });
  });

  return io;
}

export function getIO(): Server {
  if (!io) {
    throw new Error("Socket.io not initialized!");
  }
  return io;
}

export function getSocketIdByUserId(userId: string): string | undefined {
  return userSocketMap.get(userId);
}
