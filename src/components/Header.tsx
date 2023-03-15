import Image from 'next/image'
import { HomeIcon, MagnifyingGlassIcon, PlusCircleIcon } from '@heroicons/react/20/solid'
import Instagram from '../../public/assets/images/Instagram.svg'
import InstagramWordmark from '../../public/assets/images/InstagramWordmark.svg'
import profile from '../../public/assets/images/profile.jpg'

export default function Header() {
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
                    <PlusCircleIcon className='h-6 cursor-pointer hover:scale-110 
                                            transition-transform duration-200 ease-out' />
                    <Image src={profile} alt='profile' className='h-10 w-10 rounded-full cursor-pointer' />
                </div>
            </div>
        </header>
    )
}
