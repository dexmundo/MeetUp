import { useSocket } from "@/context/socket";
import usePeer  from "@/hooks/usePeer";
import { useParams } from "next/navigation";

const Room = ()=>{
    const params = useParams()
    const socket = useSocket()?.socket
  // const error = useSocket()?.error

  const {myId, peer} = usePeer()

  console.log(params?.roomId);

  return (<div>This is room - {params?.roomId}</div>)
  
}

export default Room