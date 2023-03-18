import Image from "next/image";
import {
    BookmarkIcon, ChatBubbleOvalLeftEllipsisIcon,
    EllipsisVerticalIcon, FaceSmileIcon, HeartIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconFilled } from '@heroicons/react/24/solid'
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import {
    addDoc, collection, deleteDoc, doc, DocumentData, onSnapshot, orderBy, query,
    QueryDocumentSnapshot, serverTimestamp, setDoc
} from "firebase/firestore";
import { db } from "../../firebase";
import Moment from "react-moment";

type PostType = {
    id: string;
    username: string;
    profile: string;
    image: string;
    caption: string;
}

export default function Post({ id, username, profile, image, caption }: PostType) {
    const { data: session } = useSession();
    const [comments, setComments] = useState<QueryDocumentSnapshot<DocumentData>[]>([]);
    const [comment, setComment] = useState<string>('');
    const [hasLiked, setHasLiked] = useState<boolean>(false);
    const [likes, setLikes] = useState<QueryDocumentSnapshot<DocumentData>[]>([])

    useEffect(() => {
        const unsubscribe = onSnapshot(query(collection(db, 'posts', id, 'comments'),
            orderBy('timestamp', 'desc')), {
            next(snapshot) {
                setComments(snapshot.docs)
            },
            error(error) {
                console.error(error);
            },
        })
        return () => unsubscribe();
    }, [db, id])

    async function sendComment(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        event.preventDefault();
        if (!comment) return;
        try {
            await addDoc(collection(db, 'posts', id, 'comments'), {
                comment: comment,
                username: session?.user?.name,
                userImage: session?.user?.image,
                timestamp: serverTimestamp()
            })
            setComment('');
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        if (session?.user?.email) {
            setHasLiked(Boolean(likes.find(like => like.id === session.user?.email)))
        }
    }, [likes])

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, 'posts', id, 'likes'), {
            next(snapshot) {
                setLikes(snapshot.docs);
            },
            error(error) {
                console.error(error);
            }
        })
        return () => unsubscribe()
    }, [db])

    async function likePost() {
        if (session?.user?.email) {
            if (hasLiked) {
                deleteDoc(doc(db, 'posts', id, 'likes', session.user.email));
            } else {
                await setDoc(doc(db, 'posts', id, 'likes', session.user.email), {
                    username: session?.user?.name
                })
            }
        }
    }

    return (
        <div className="bg-white my-7 border rounded-md">
            <div className="flex items-center p-5">
                <Image draggable={false}
                    className="h-12 w-12 rounded-full 
                    object-cover p-1 border mr-3"
                    src={profile} width={150} height={150}
                    alt={username} />
                <p className="font-bold flex-1">{username}</p>
                <EllipsisVerticalIcon className="h-5 cursor-pointer" />
            </div>
            <div>
                <img src={image}
                    draggable={false}
                    className="object-cover w-full"
                    width={500} height={280}
                    alt={caption} />
                {session &&
                    <div className="flex justify-between px-4 pt-4">
                        <div className="flex gap-4">
                            {hasLiked ?
                                (<HeartIconFilled onClick={likePost}
                                    className="btn text-red-500" />)
                                :
                                (<HeartIcon onClick={likePost}
                                    className="btn" />)}
                            <ChatBubbleOvalLeftEllipsisIcon className="btn" />
                        </div>
                        <BookmarkIcon className="btn" />
                    </div>
                }
            </div>

            <p className="p-5 truncate">
                {likes.length > 0 && (
                    <p className="font-bold mb-1 text-sm">{likes.length} likes</p>
                )}
                <span className="font-bold">{username}:</span> {caption}
            </p>
            {comments.length > 0 && (
                <div className="mx-10 max-h-24 overflow-y-scroll 
                scrollbar-none">
                    {comments.map(comment => (
                        <div className="flex items-center space-x-2 mb-3">
                            <img className="h-7 rounded-full object-cover"
                                src={comment.data().userImage}
                                alt={comment.data().username} />
                            <p className="font-semibold text-sm">
                                {comment.data().username}:
                            </p>
                            <p className="flex-1 truncate text-sm">
                                {comment.data().comment}
                            </p>
                            <Moment className="text-sm" fromNow>
                                {comment.data().timestamp?.toDate()}
                            </Moment>
                        </div>))
                    }
                </div>
            )}
            {session &&
                <form action="" className="flex items-center p-4">
                    <FaceSmileIcon className="h-7" />
                    <input type="text"
                        value={comment}
                        onChange={event => setComment(event.target.value)}
                        className="border-none flex-1 focus:ring-0"
                        placeholder="Enter your comment..." />
                    <button disabled={!comment.trim()}
                        onClick={sendComment}
                        className="text-blue-400 
                        font-bold outline-none
                        disabled:text-gray-400 
                        disabled:cursor-not-allowed">
                        Post
                    </button>
                </form>
            }
        </div>
    )
}
