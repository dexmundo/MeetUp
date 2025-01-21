import Peer from "peerjs"
import { useEffect, useRef, useState } from "react"

const usePeer = () => {
    const [peer, setPeer] = useState<any | null>(null)
    const [myId, setMyId] = useState('')
    const isPeerSet = useRef<boolean>(false)

    const myPeer = new Peer()
    useEffect(() => {
        if (isPeerSet.current) return;
        isPeerSet.current = true;
        if (myPeer) {
            setPeer(myPeer)

            myPeer.on('open', (id) => {
                console.log("My Peer ID is ", id);
                setMyId(id)
            })
        }
    }, [])

    return { peer, myId }
}

export default usePeer