import ReactPlayer from "react-player"

type Props = {
    url: any
    playerId: string
    muted: boolean,
    playing: boolean
}

const Player = (props: Props) => {

    const { url, playerId, muted, playing } = props
    return (
        <>
            <ReactPlayer url={url} key={playerId} muted={muted} playing={playing} />
        </>
    )

}

export default Player