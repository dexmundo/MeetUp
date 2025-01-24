import { useSocket } from "@/context/socket";
import { useParams } from "next/navigation";
import Peer from "peerjs";
import { useEffect, useRef, useState } from "react";

const usePeer = () => {
    const [peer, setPeer] = useState<Peer | null>(null);
    const [myId, setMyId] = useState('');
    const isPeerSet = useRef<boolean>(false);

    const socket = useSocket()?.socket;
    const roomId = useParams()?.roomId;

    useEffect(() => {
        if (isPeerSet.current || !socket || !roomId) return;
        isPeerSet.current = true;

        const myPeer = new Peer();

        setPeer(myPeer);

        myPeer.on('open', (id) => {
            console.log("My Peer ID is ", id);
            setMyId(id);
            socket?.emit('join-room', roomId, id);
        });

        /* return () => {
            myPeer.destroy(); // Clean up peer connection on unmount
        }; */
    }, [roomId, socket, isPeerSet.current]);

    return { peer, myId };
};

export default usePeer;
