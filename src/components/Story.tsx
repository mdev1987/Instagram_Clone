import Image from "next/image";
import { StoryType } from "./Stories";

export default function Story({ username, img }: StoryType) {
    return (
        <div>
            <Image src={img} height={150} width={150} alt={username} />
            <p>{username}</p>
        </div>
    )
}
