import { NextApiRequest, NextApiResponse } from 'next';
import { Server as SocketServer, Socket } from 'socket.io';

type CustomResponse = NextApiResponse & {
    socket: {
        server: {
            io?: SocketServer;
        };
    };
};

const SocketHandler = (req: NextApiRequest, res: CustomResponse) => {
    console.log("Called Socket API");

    if (res.socket?.server?.io) {
        console.log("Socket already running");
    } else {
        const io = new SocketServer(res.socket.server);  // Properly typed

        res.socket.server.io = io;  // Avoids unnecessary "!" assertions

        io.on("connection", (socket: Socket) => {
            console.log("Server is connected");

            socket.on("join-room", (roomId: string, userId: string) => {
                console.log(`A new user ${userId} joined room - ${roomId}`);
                socket.join(roomId);
                socket.broadcast.to(roomId).emit("user-connected", userId);
            });

            socket.on("user-toggle-video", (userId: string, roomId: string) => {
                console.log("User toggled video stream");
                socket.broadcast.to(roomId).emit("user-toggle-video", userId);
            });

            socket.on("user-toggle-audio", (userId: string, roomId: string) => {
                console.log("User toggled audio stream");
                socket.broadcast.to(roomId).emit("user-toggle-audio", userId);
            });

            socket.on("user-leave", (userId: string, roomId: string) => {
                console.log("User left the room");
                socket.broadcast.to(roomId).emit("user-leave", userId);
            });
        });
    }
    res.end();
};

export default SocketHandler;
