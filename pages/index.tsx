import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Button from '@/components/Button';
import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/hooks/use-toast';

export default function Home() {
  const router = useRouter();
  const [roomId, setRoomId] = useState('');
  const { toast } = useToast()

  const createAndJoinRoom = () => {
    const newRoomId = uuidv4();
    router.push(`/${newRoomId}`);
  };

  const joinRoom = () => {
    if (roomId) router.push(`/${roomId}`);
    else toast({
      description: "Please enter a valid Room ID",
      variant: 'destructive'
    })
  };

  return (
    <div className='w-full h-screen flex flex-col items-center justify-center p-4 text-center bg-neutral-900 text-white'>
      <Toaster />
      <h1 className='text-4xl font-bold mb-4'><span className='meetup-text text-5xl'>MeetUp</span> - Connect Instantly</h1>
      <p className='text-lg text-neutral-400 mb-6'>No sign-ups, no downloads—just smooth, secure video calls with MeetUp. Stay connected with ease.</p>
      <div className='flex flex-col gap-4 max-w-xs w-full'>
        <input
          placeholder='Enter Room ID'
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
          className='bg-neutral-800 text-white placeholder-neutral-500 px-4 py-2 w-full border border-neutral-700 rounded-md'
        />
        <Button text='Join a Room' onClick={joinRoom} />
      </div>
      <span className='my-4 text-neutral-500'>------ OR ------</span>
      <Button text='Create a New Room' onClick={createAndJoinRoom} />
    </div>
  );
}
