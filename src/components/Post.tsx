import Image from "next/image";
import { PostType } from "./Posts";

export default function Post({ profile, image, caption }: PostType) {
    return (
        <div>
            <Image src={image} width={500} height={500} alt="post-image" />
            <p>{caption}</p>
        </div>
    )
}
