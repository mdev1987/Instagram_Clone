import minifaker, { username } from 'minifaker'
import Post from './Post'

export type PostType = {
    id: number;
    username: string;
    profile: string;
    caption: string,
    image: string;
}

const posts = minifaker.array(10, i => ({
    id: i,
    username: minifaker.username(),
    caption: minifaker.array(5, i => minifaker.word({ type: 'noun' })).join(" "),
    profile: `https://i.pravatar.cc/150?u=${minifaker.nanoId.nanoid()}`,
    image: `https://picsum.photos/seed/${minifaker.nanoId.nanoid()}/1000`
}))
export default function Posts() {

    return (
        <div>
            {posts.map(post => (<Post key={post.id} {...post} />))}
        </div>
    )
}
