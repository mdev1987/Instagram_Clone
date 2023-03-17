import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import ProfileAvatar from './ProfileAvatar'

export default function MiniProfile() {
    const { data: session } = useSession()
    return (
        <div className='flex justify-between items-center mt-14 ml-10'>
            {session?.user?.image ? (
                <Image src={session.user.image} alt="mdev1987"
                    height={65} width={65}
                    draggable={false}
                    className="h-16 w-16 rounded-full p-[2px]" />
            ) : (
                <ProfileAvatar name={session?.user?.name || ''} />
            )}

            <div className='flex-1 ml-4'>
                <h2 className='font-bold'>{session?.user?.name}</h2>
                <h3 className='text-sm text-gray-400'>
                    Welcome to instagram
                </h3>
            </div>
            <button onClick={() => signOut()}
                className='font-semibold text-blue-400 text-sm'>
                Sign out
            </button>
        </div>
    )
}
