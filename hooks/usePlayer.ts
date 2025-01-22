import { useState } from "react"

type Player = {
    url: MediaStream;
    muted: boolean;
    playing: boolean;
};
const usePlayer = () => {

    // Fix: Explicitly define state type
    const [players, setPlayers] = useState<Record<string, Player>>({});
    return { players, setPlayers }
}

export default usePlayer