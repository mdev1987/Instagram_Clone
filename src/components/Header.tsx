import Image from 'next/image'
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import Instagram from '../../public/assets/images/Instagram.svg'
import InstagramWordmark from '../../public/assets/images/InstagramWordmark.svg'

export default function Header() {
    return (
        <div>
            <div className="flex items-center justify-between max-w-6xl mt-1">
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

                <h1>Right Side</h1>
            </div>
        </div>
    )
}
