import { Server } from 'socket.io'

const SocketHandler = (req: any, res: any) => {

    if (res.socket.server.io) {
        console.log("socket already running");
    } else {
        const io = new Server(res.socket.server)
        res.socket.server.io = io

        io.on("connection", () => {
            console.log("server is connected")
        })
    }
    res.end()
}

export default SocketHandler

