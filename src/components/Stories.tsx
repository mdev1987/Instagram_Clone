import minifaker from 'minifaker'
import 'minifaker/locales/en'
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react'
import Story from './Story';

export type StoryType = {
    username: string;
    img: string;
    id?: number;
    isUser?: boolean;
}

export default function Stories() {
    const { data: session } = useSession()
    const [storyUsers, setStoryUsers] = useState<StoryType[]>([])
    useEffect(() => {
        const stories = minifaker.array(15, (i) => ({
            username: minifaker.username().toLowerCase(),
            img: `https://i.pravatar.cc/150?u=${minifaker.nanoId.nanoid()}`,
            id: i
        }))
        setStoryUsers(stories)

    }, [])
    return (
        <div className='flex gap-2 p-6
         bg-white mt-8 items-center
         justify-start rounded-sm   
         scrollbar-none                
         border-gray-200 overflow-x-scroll'>
            {session && (
                <Story img={session.user?.image || ''}
                    isUser={true}
                    username={session?.user?.name || ''} />
            )}
            {storyUsers.map((story: any) =>
                (<Story key={story.id} {...story} />))}
        </div>
    )
}
