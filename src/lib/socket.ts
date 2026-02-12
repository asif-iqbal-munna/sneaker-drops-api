import { Server } from "socket.io";
import { Drop } from "../modules/drops/drops.model";

let io: Server;

export const initSocket = (server: any) => {
  io = new Server(server, {
    path: "/api/socket",
    cors: { origin: "*" }
  });

  io.on("connection", (socket) => {
    console.log("client connected", socket.id);
  });
};

type DropEvent =
  | {
      type: "drop";
      payload: Drop;
    }
  | {
      type: "stock";
      payload: { dropId: number; available: number };
    }
  | {
      type: "purchase";
      payload: { dropId: number; username: string };
    };


export const emitDropEvent = (event: DropEvent) => {
  io.emit("drop:event", event);
};
