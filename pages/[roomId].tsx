import { useSocket } from "@/context/socket";
import usePeer from "@/hooks/usePeer";
import { useParams } from "next/navigation";
import useMediaStream from "@/hooks/useMediaStream";
import Player from "@/components/Player";

const Room = () => {
  const params = useParams()
  const socket = useSocket()?.socket
  // const error = useSocket()?.error
  const { myId, peer } = usePeer()
  const { stream } = useMediaStream()


  return (
    <div className="w-full">
      <h1>This is room - {params?.roomId}</h1>
      <div className="w-full h-full">
        {stream && <Player url={stream} playerId={myId} key={myId} muted playing />}
      </div>
    </div>)

}

export default Room