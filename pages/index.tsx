import { useSocket } from "@/context/socket";
import { useEffect } from "react";

export default function Home() {
  const socket = useSocket()?.socket
  const error = useSocket()?.error

  useEffect(() => {
    socket?.on("connect", () => {
      console.log(socket.id);
    });
  }, [socket])
  

  return (
    <h1>Shashant is gonna build this amazing app</h1>
  );
}
