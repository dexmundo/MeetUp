import ReactPlayer from "react-player"

type Props = {
    url: any
    playerId: string
    muted: boolean,
    playing: boolean
    isActive: boolean,
    className?: string
}

const Player = (props: Props) => {
    const { url, playerId, muted, playing, isActive, className } = props;

    return (
        <div className={`w-full h-full overflow-hidden mirror bg-neutral-800 rounded-2xl relative ${className}`}>
            <div className=" w-full h-full">
                <ReactPlayer
                    width="100%"
                    height="100%"
                    url={url}
                    key={playerId}
                    muted
                    playing={playing}
                />
            </div>
        </div >
    );
}

export default Player