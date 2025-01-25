import { useState } from "react"
import { cloneDeep } from 'lodash'
import { useSocket } from "@/context/socket";

type Player = {
    url: MediaStream;
    muted: boolean;
    playing: boolean;
};
const usePlayer = (myId: any, roomId: any) => {

    const socket = useSocket()
    const [players, setPlayers] = useState<Record<string, Player>>({});
    const playersCopy = cloneDeep(players)

    const nonHighlightedPlayer = playersCopy[myId]
    delete playersCopy[myId]

    const highlightedPlayer = playersCopy

    const toggleAudio = () => {
        console.log("I toggled my audio");
        setPlayers((prev) => {
            const copy = cloneDeep(prev)
            if (copy[myId]) {
                copy[myId].muted = !copy[myId].muted
            }
            return { ...copy }
        })
        if (socket?.socket) {
            socket.socket.emit('user-toggle-audio', myId, roomId);
        } else {
            console.warn("Socket is not connected");
        }
    }

    const toggleVideo = () => {
        console.log("I toggled my video");
        setPlayers((prev) => {
            const copy = cloneDeep(prev)
            if (copy[myId]) {
                copy[myId].playing = !copy[myId].playing
            }
            return { ...copy }
        })
        if (socket?.socket) {
            socket.socket.emit('user-toggle-video', myId, roomId);
        } else {
            console.warn("Socket is not connected");
        }
    }


    return { players, setPlayers, highlightedPlayer, nonHighlightedPlayer, toggleAudio, toggleVideo }
}

export default usePlayer