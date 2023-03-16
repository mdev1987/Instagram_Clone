import Image from "next/image";
import { StoryType } from "./Stories";

export default function Story({ username, img }: StoryType) {
    return (
        <div>
            <Image
                className="h-14 w-14 rounded-full 
                p-[1.5px] border-2 border-red-500 
                hover:scale-110 cursor-pointer
                transition-transform duration-200
                ease-out"
                draggable={false}
                src={img} height={150} width={150} alt={username} />
            <p className="text-sm w-14 truncate">{username}</p>
        </div>
    )
}
