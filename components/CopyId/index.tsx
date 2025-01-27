import React from 'react'
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"
import { Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

type Props = {
    roomId: string | string[] | undefined
}

const CopyId = ({ roomId }: Props) => {
    if (!roomId || typeof roomId !== 'string') return null;

    const { toast } = useToast()

    const shortenedId = `${roomId.slice(0, 8)}...`;

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(roomId);
            toast({
                description: "Room ID copied to clipboard.",
                className: "bg-neutral-950 text-white border-neutral-700 "
            })
        } catch (err) {
            console.error("Failed to copy:", err);
        }
    };

    return (
        <div className="absolute flex left-5 top-5 sm:bottom-8 sm:top-auto bg-neutral-700 gap-2 items-center text-white rounded-xl sm:rounded-full pl-4 pr-1 py-1">
            <HoverCard>
                <HoverCardTrigger >
                    {shortenedId}
                </HoverCardTrigger>
                <HoverCardContent className="bg-neutral-500 text-white border-none w-fit">
                    Copy Room ID
                </HoverCardContent>
                <Copy onClick={copyToClipboard} className='size-7 p-1.5 rounded-full cursor-pointer bg-neutral-900 hover:opacity-75' />
            </HoverCard>
        </div>
    );
}

export default CopyId;
