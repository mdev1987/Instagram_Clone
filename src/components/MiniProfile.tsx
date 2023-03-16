import Image from 'next/image'
import profile from '../../public/assets/images/profile.jpg'

export default function MiniProfile() {
    return (
        <div className='flex justify-between items-center mt-14 ml-10'>
            <Image src={profile} alt="mdev1987"
                height={65} width={65}
                className="h-16 w-16 rounded-full p-[2px]"
                placeholder={'blur'} />
            <div className='flex-1 ml-4'>
                <h2 className='font-bold'>mdev1987</h2>
                <h3 className='text-sm text-gray-400'>
                    Welcome to instagram
                </h3>
            </div>
            <button className='font-semibold text-blue-400 text-sm'>
                Sign out
            </button>
        </div>
    )
}
