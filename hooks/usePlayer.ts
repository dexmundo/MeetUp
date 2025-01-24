import { useState } from "react"
import { cloneDeep } from 'lodash'

type Player = {
    url: MediaStream;
    muted: boolean;
    playing: boolean;
};
const usePlayer = (myId: any) => {

    // Fix: Explicitly define state type
    const [players, setPlayers] = useState<Record<string, Player>>({});
    const playersCopy = cloneDeep(players)

    const nonHighlightedPlayer = playersCopy[myId]
    delete playersCopy[myId]

    const highlightedPlayer = playersCopy

    return { players, setPlayers, highlightedPlayer, nonHighlightedPlayer }
}

export default usePlayer