import { useSocket } from "@/context/socket";
import usePeer from "@/hooks/usePeer";
import { useParams } from "next/navigation";
import useMediaStream from "@/hooks/useMediaStream";
import Player from "@/components/Player";
import { useEffect } from "react";
import usePlayer from "@/hooks/usePlayer";

const Room = () => {
  const roomId = useParams()?.roomId
  const socket = useSocket()?.socket
  // const error = useSocket()?.error
  const { stream } = useMediaStream()
  const { players, setPlayers } = usePlayer()

  const { myId, peer } = usePeer()


  useEffect(() => {
    if (!socket || !peer || !stream) return;
    const handleUserConnected = (newUser: any) => {
      console.log(`new user ${newUser} joined the room - ${roomId}`);

      const call = peer.call(newUser, stream)

      call.on('stream', (incomingStream: MediaStream) => {
        console.log(`Incoming stream from ${newUser}`);
        setPlayers((prev) => ({
          ...prev,
          [newUser]: {
            url: incomingStream,
            muted: false,
            playing: true,
          }
        }))
      })
    }

    socket?.on("user-connected", handleUserConnected)

    return () => {
      socket?.off("user-connected", handleUserConnected)
    }
  }, [socket, peer, stream])

  useEffect(() => {
    if (!peer || !stream) return;
    peer.on('call', (call: any) => {

      const { peer: callerId } = call;
      call.answer(stream)

      call.on('stream', (incomingStream: any) => {
        console.log(`Incoming stream from ${callerId}`);
        setPlayers((prev) => ({
          ...prev,
          [callerId]: {
            url: incomingStream,
            muted: false,
            playing: true,
          }
        }))
      })
    })

  }, [peer, stream])

  useEffect(() => {
    if (!stream || !myId) return
    console.log(`setting my stream ${myId}`);
    setPlayers((prev) => ({
      ...prev,
      [myId]: {
        url: stream,
        muted: false,
        playing: true,
      }
    }))

  }, [stream, myId])


  return (
    <div className="w-full">
      <h1>This is room - {roomId}</h1>

      {players && Object.keys(players).map((playerId) => {
        const { url, muted, playing } = players[playerId]
        return (
          <div key={playerId} className="w-full h-full hover:scale-105 duration-300 flex justify-around">
            <Player url={url} playerId={playerId} key={playerId} muted={muted} playing={playing} />
          </div>
        )
      })}
    </div>)

}

export default Room