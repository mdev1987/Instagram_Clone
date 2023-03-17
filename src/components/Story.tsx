import { PlusIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { StoryType } from "./Stories";

export default function Story({ username, img, isUser }: StoryType) {
    return (
        <div className="relative group cursor-pointer">
            <Image
                className="h-14 w-14 rounded-full 
                p-[1.5px] border-2 border-red-500 
                group-hover:scale-110
                transition-transform duration-200
                ease-out"
                draggable={false}
                src={img} height={60}
                width={50} alt={username} />
            {isUser && (
                <PlusIcon className="absolute h-6 text-white 
                top-4 left-4" />
            )}
            <p className="text-sm w-14 truncate">{username}</p>
        </div>
    )
}
