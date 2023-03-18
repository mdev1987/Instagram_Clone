import { collection, DocumentData, onSnapshot, orderBy, query, QueryDocumentSnapshot } from 'firebase/firestore';
import minifaker from 'minifaker'
import 'minifaker/locales/en'
import { useEffect, useState } from 'react';
import { db } from '../../firebase';
import Post from './Post'

export default function Posts() {
    const [posts, setPosts] = useState<QueryDocumentSnapshot<DocumentData>[]>([]);
    useEffect(() => {
        const unsubscriber = onSnapshot(query(collection(db, 'posts'), orderBy('timestamp', 'desc')), (snapshot) => {
            setPosts(snapshot.docs)

        }, (error) => console.error(error));
        return () => unsubscriber();
    }, [])
    return (
        <div>
            {posts
                .map(post => (
                    <Post
                        key={post.id}
                        profile={post.data().profileImg}
                        username={post.data().name}
                        caption={post.data().caption}
                        image={post.data().image}
                    />))}
        </div>
    )
}
