import Image from 'next/image'
import Instagram from '../../public/assets/images/Instagram.svg'
import InstagramWordmark from '../../public/assets/images/InstagramWordmark.svg'

export default function Header() {
    return (
        <div>
            {/* Left */}
            <div className="flex items-center justify-between max-w-6xl">
                <div className="h-32 w-32 relative hidden lg:inline-grid cursor-pointer">
                    <Image src={InstagramWordmark}
                        className="object-contain"
                        alt="Instagram" />
                </div>
                <div className="h-14 w-14 relative lg:hidden inline-grid cursor-pointer">
                    <Image src={Instagram}
                        className="object-contain"
                        alt="Instagram" />
                </div>
                <h1>Right Side</h1>
            </div>

            {/* Middle */}

            {/* Rigth */}
        </div>
    )
}
