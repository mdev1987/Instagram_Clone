import Image from "next/image";
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid';
import { PostType } from "./Posts";

export default function Post({ profile, image, username, caption }: PostType) {
    return (
        <div className="bg-white my-7 border rounded-md">
            <div className="flex items-center p-5">
                <Image className="h-12 w-12 rounded-full object-cover p-1 border mr-3"
                    src={profile} width={150} height={150} alt={username} />
                <p className="font-bold flex-1">{username}</p>
                <EllipsisVerticalIcon className="h-5" />
            </div>
            <div>
                <Image src={image}
                    className="object-cover w-full"
                    width={500} height={500}
                    alt={caption} />
                <p>{caption}</p>
            </div>

        </div>
    )
}
