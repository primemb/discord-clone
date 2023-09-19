import { Server as NetServer, Socket } from "net";
import { NextApiResponse } from "next";
import { Server as SocketServerIo } from "socket.io";
import { Member, Profile, Server } from "@prisma/client";

export type ServerWithMemebrsWithProfile = Server & {
  members: (Member & { profile: Profile })[];
};

export type NextApiResponseServerIo = NextApiResponse & {
  socket: Socket & {
    server: NetServer & {
      io: SocketServerIo;
    };
  };
};
