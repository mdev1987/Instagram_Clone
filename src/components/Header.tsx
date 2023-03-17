import Image from 'next/image'
import { HomeIcon, MagnifyingGlassIcon, PlusCircleIcon } from '@heroicons/react/24/outline'
import Instagram from '../../public/assets/images/Instagram.svg'
import InstagramWordmark from '../../public/assets/images/InstagramWordmark.svg'
import profile from '../../public/assets/images/profile.jpg'
import { useSession, signIn, signOut } from 'next-auth/react'
import ProfileAvatar from './ProfileAvatar'
import { useRecoilState } from 'recoil'
import { modalState } from '@/atom/modalAtom'

export default function Header() {
    const { data: session } = useSession();
    const [uploadModal, setUploadModal] = useRecoilState(modalState);
    return (
        <header className='shadow-sm border-b sticky top-0 bg-white z-30'>
            <div className="flex items-center justify-between max-w-6xl mt-1 mx-4 xl:mx-auto">
                <div className="h-18 w-36 relative hidden lg:inline-grid cursor-pointer">
                    <Image src={InstagramWordmark}
                        className="object-contain"
                        alt="Instagram" />
                </div>
                <div className="h-16 w-16 relative lg:hidden inline-grid cursor-pointer">
                    <Image src={Instagram}
                        className="object-contain"
                        alt="Instagram" />
                </div>

                <div className="relative">
                    <div className="absolute top-2 left-2">
                        <MagnifyingGlassIcon className='h-5 text-gray-500' />
                    </div>
                    <input type="text" className="bg-gray-50 
                     rounded-md pl-10 border-gray-500 text-sm
                     focus:ring-black focus:border-black" placeholder="Search" />
                </div>

                <div className="flex items-center gap-4">
                    <HomeIcon className='h-6 hidden md:inline-flex cursor-pointer hover:scale-110 
                                            transition-transform duration-200 ease-out' />
                    {session ? (
                        <>
                            <PlusCircleIcon
                                onClick={() => setUploadModal(true)}
                                className='h-6 cursor-pointer hover:scale-110 
                                            transition-transform duration-200 ease-out' />
                            {session.user?.name ? (
                                <Image onClick={() => signOut()}
                                    draggable={false}
                                    src={session.user?.image || profile}
                                    width={50} height={50}
                                    alt='profile'
                                    className='h-10 w-10 rounded-full cursor-pointer' />
                            ) : (
                                <ProfileAvatar onClick={() => signOut()}
                                    name={session.user?.name || ''} />
                            )}

                        </>
                    ) : (<button className='border rounded-md
                     bg-gray-50 hover:bg-gray-100 p-2'
                        onClick={() => signIn()}>
                        Sign in
                    </button>)}
                </div>
            </div>
        </header>
    )
}
