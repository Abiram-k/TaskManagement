import { io, Socket } from "socket.io-client";

export const createSocket = (token: string): Socket => {
  return io(import.meta.env.VITE_SOCKET_URL, {
    withCredentials: true,
    auth: {
      token,
    },
    transports: ["websocket"],
  });
};
