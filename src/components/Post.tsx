import Image from "next/image";
import { BookmarkIcon, ChatBubbleOvalLeftEllipsisIcon, EllipsisVerticalIcon, FaceSmileIcon, HeartIcon } from '@heroicons/react/24/outline';
import { PostType } from "./Posts";

export default function Post({ profile, image, username, caption }: PostType) {
    return (
        <div className="bg-white my-7 border rounded-md">
            <div className="flex items-center p-5">
                <Image draggable={false}
                    className="h-12 w-12 rounded-full object-cover p-1 border mr-3"
                    src={profile} width={150} height={150} alt={username} />
                <p className="font-bold flex-1">{username}</p>
                <EllipsisVerticalIcon className="h-5" />
            </div>
            <div>
                <Image src={image}
                    draggable={false}
                    className="object-cover w-full"
                    width={500} height={500}
                    alt={caption} />

                <div className="flex justify-between px-4 pt-4">
                    <div className="flex gap-4">
                        <HeartIcon className="btn" />
                        <ChatBubbleOvalLeftEllipsisIcon className="btn" />
                    </div>
                    <BookmarkIcon className="btn" />
                </div>
            </div>

            <p className="p-5 truncate">
                <span className="font-bold">{username}:</span> {caption}
            </p>

            <form action="" className="flex items-center p-4">
                <FaceSmileIcon className="h-7" />
                <input type="text"
                    className="border-none flex-1 focus:ring-0"
                    placeholder="Enter your comment..." />
                <button className="text-blue-400 font-bold">Post</button>
            </form>
        </div>
    )
}
