import { useSocket } from "@/context/socket"
import { useParams } from "next/navigation"
import Peer from "peerjs"
import { useEffect, useRef, useState } from "react"

const usePeer = () => {
    const [peer, setPeer] = useState<any | null>(null)
    const [myId, setMyId] = useState('')
    const isPeerSet = useRef<boolean>(false)

    const socket = useSocket()?.socket
    const roomId = useParams()?.roomId

    const myPeer = new Peer()
    useEffect(() => {
        if (isPeerSet.current || !socket || !roomId) return;
        isPeerSet.current = true;
        if (myPeer) {
            setPeer(myPeer)

            myPeer.on('open', (id) => {
                console.log("My Peer ID is ", id);
                setMyId(id)
                socket?.emit('join-room', roomId, id)
            })
        }
    }, [roomId, socket])

    return { peer, myId }
}

export default usePeer