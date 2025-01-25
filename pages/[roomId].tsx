import { useSocket } from "@/context/socket";
import usePeer from "@/hooks/usePeer";
import { useParams } from "next/navigation";
import useMediaStream from "@/hooks/useMediaStream";
import Player from "@/components/Player";
import { useEffect } from "react";
import usePlayer from "@/hooks/usePlayer";
import ControlPanel from "@/components/ControlPanel";
import { cloneDeep } from "lodash";

const Room = () => {
  const roomId = useParams()?.roomId
  const socket = useSocket()?.socket
  // const error = useSocket()?.error
  const { myId, peer } = usePeer()
  const { stream } = useMediaStream()
  const { players, setPlayers, highlightedPlayer, nonHighlightedPlayer, toggleAudio, toggleVideo } = usePlayer(myId, roomId)

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

  useEffect(() => {
    if (!socket || !setPlayers) return;

    const handleToggleAudio = (userId: any) => {
      console.log(`user with id ${userId} toggled audio`);
      setPlayers((prev) => {
        const copy = cloneDeep(prev)
        if (copy[userId]) {
          copy[userId].muted = !copy[userId].muted
        }
        return { ...copy }
      })
    }
    const handleToggleVideo = (userId: any) => {
      console.log(`user with id ${userId} toggled video`);
      setPlayers((prev) => {
        const copy = cloneDeep(prev)
        if (copy[userId]) {
          copy[userId].playing = !copy[userId].playing
        }
        return { ...copy }
      })
    }

    socket.on("user-toggle-audio", handleToggleAudio)
    socket.on("user-toggle-video", handleToggleVideo)


    return () => {
      socket.off("user-toggle-video", handleToggleVideo)
      socket.off("user-toggle-audio", handleToggleAudio)
    }
  }, [socket, setPlayers])



  console.log(nonHighlightedPlayer);

  const newMemberJoined = (highlightedPlayer && Object.keys(highlightedPlayer).length > 0)

  return (
    <div className="w-full h-screen bg-neutral-950 ">
      <div className="flex h-[90vh]">
        {highlightedPlayer && Object.keys(highlightedPlayer).map((playerId) => {
          const { url, muted, playing } = highlightedPlayer[playerId]
          return (
            <div key={playerId} className="w-full p-4 transition-all duration-1000 ease-in-out">
              <Player url={url} playerId={playerId} key={playerId} muted={muted} playing={playing} isActive />
            </div>
          )
        })}
        <div className={` transition-all p-4 duration-1000 ease-in-out ${newMemberJoined ? 'w-full w-1/2 xs:w-1/4 sm:w-1/3 md:w-1/4 lg:w-1/5 h-fit absolute top-5 right-5 md:top-10 md:right-10 hover:scale-110 duration-500' : 'w-full '}`}>
          {nonHighlightedPlayer && (<Player className={`shadow-xl ${newMemberJoined && " hover:border-[3px] border-blue-500 transition-all duration-500 ease-in-out"}`} url={nonHighlightedPlayer.url} muted={nonHighlightedPlayer.muted} playerId={"1"} key={1} playing={nonHighlightedPlayer.playing} isActive />)}
        </div>
      </div>
      <div className="h-[10vh] w-full ">
        <ControlPanel muted={nonHighlightedPlayer?.muted} playing={nonHighlightedPlayer?.playing} toggleAudio={toggleAudio} toggleVideo={toggleVideo} />
      </div>
    </div>)

}

export default Room