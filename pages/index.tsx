import { v4 as uuidv4 } from 'uuid'
import { useRouter } from 'next/navigation'
import Button from '@/components/Button'
import { useState } from 'react'

export default function Home() {
  const router = useRouter()
  const [roomId, setRoomId] = useState('')

  const createAndJoinRoom = () => {
    const newRoomId = uuidv4()
    router.push(`/${newRoomId}`)
  }

  const joinRoom = () => {
    if (roomId) router.push(`/${roomId}`)
    else alert("Please enter a Room id to join a room")
  }

  return (
    <div className='w-full text-center grid gap-8'>
      <h1 className='text-2xl bg-blue-500 '>Shashant is building this amazing video calling app called - MeetUp</h1>
      <div className='flex max-w-lg mx-auto flex-col gap-4 '>
        <input placeholder='Enter Room ID' value={roomId} onChange={(e) => setRoomId(e.target.value)} className='bg-neutral-200 text-neutral-800 placeholder:italic px-4 py-1 w-fit border border-neutral-300 rounded-md' />
        <Button text='Join a Room' onClick={joinRoom} />
      </div>
      <span>------OR------</span>
      <div>
        <Button text='Create a new Room' onClick={createAndJoinRoom} />
      </div>
    </div>
  );
}
