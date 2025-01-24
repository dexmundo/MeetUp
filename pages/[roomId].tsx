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
  const { myId, peer } = usePeer()
  const { stream } = useMediaStream()
  const { players, setPlayers, highlightedPlayer, nonHighlightedPlayer } = usePlayer(myId)

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



  console.log(nonHighlightedPlayer);

  const newMemberJoined = (highlightedPlayer && Object.keys(highlightedPlayer).length > 0)

  return (
    <div className="w-full h-screen flex">
      {highlightedPlayer && Object.keys(highlightedPlayer).map((playerId) => {
        const { url, muted, playing } = highlightedPlayer[playerId]
        return (
          <div key={playerId} className="w-full h-[95vh] p-6 transition-all duration-1000 ease-in-out">
            <Player url={url} playerId={playerId} key={playerId} muted={muted} playing={playing} isActive />
          </div>
        )
      })}
      <div className={`p-6 transition-all duration-1000 ease-in-out  ${newMemberJoined ? 'w-1/4 h-fit my-auto hover:scale-110 duration-300' : 'w-full h-[95vh]'}`}>
        {nonHighlightedPlayer && (<Player url={nonHighlightedPlayer.url} muted={nonHighlightedPlayer.muted} playerId={"1"} key={1} playing={nonHighlightedPlayer.playing} isActive={newMemberJoined ? false : true} />)}
      </div>
    </div>)

}

export default Room