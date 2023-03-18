import { modalState } from "@/atom/modalAtom"
import { CameraIcon } from "@heroicons/react/24/outline";
import { useRecoilState } from "recoil"
import { addDoc, collection, doc, serverTimestamp, updateDoc } from 'firebase/firestore'
import Modal from 'react-modal'
import React, { useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { db, storage } from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

export default function UploadModal() {
    const [open, setOpen] = useRecoilState(modalState);
    const [selectedFile, setSelectedFile] = useState<File | null>()
    const filePickerRef = useRef<HTMLInputElement>(null);
    const captionRef = useRef<HTMLInputElement>(null)
    const [loading, setLoading] = useState<boolean>(false);
    const [progresspercent, setProgresspercent] = useState(0);
    const addImageToPost = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { files } = event.target;
        setSelectedFile(files?.[0])
    }
    const onCloseModal = () => {
        setSelectedFile(null);
        setOpen(false);
    }
    const { data: session } = useSession()
    async function uploadPost() {
        if (loading) return;
        setLoading(true);
        try {
            const docRef = await addDoc(collection(db, 'posts'), {
                caption: captionRef?.current?.value,
                name: session?.user?.name,
                email: session?.user?.email,
                profileImg: session?.user?.image,
                timestamp: serverTimestamp(),
            })
            if (selectedFile) {
                const imageRef = ref(storage, `posts/${docRef.id}/image`)
                uploadBytesResumable(imageRef, selectedFile).on("state_changed", snapshot => {
                    const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                    setProgresspercent(progress)
                }, (error) => {
                    console.log(error)
                }, async () => {
                    const downloadUrl = await getDownloadURL(imageRef);
                    await updateDoc(doc(db, "posts", docRef.id), {
                        image: downloadUrl,
                    })
                })
            }
        } catch (error) {

        } finally {
            setLoading(false);
            setOpen(false);
            setSelectedFile(null);
        }


    }
    return (
        <Modal className="max-w-lg w-[90%] p-8
        fixed top-40 bg-white rounded-sm
        border-1 shadow-md        
        left-[50%] 
        focus:outline-none
        translate-x-[-50%]"
            ariaHideApp={false}
            // shouldCloseOnOverlayClick={false}
            isOpen={open}
            onRequestClose={onCloseModal} >
            <div className="flex flex-col justify-center items-center h-[90%]">
                {
                    selectedFile ? (
                        <img src={URL.createObjectURL(selectedFile)} alt=""
                            onClick={() => filePickerRef.current?.click()}
                            className="w-full max-h-[250px] 
                            object-cover cursor-pointer" />
                    ) : (

                        <CameraIcon onClick={() => filePickerRef.current?.click()}
                            className="h-14 bg-red-200 
                        rounded-full border-2 text-red-500
                        p-2 cursor-pointer" />
                    )
                }

                <input type="file" accept="image/*" hidden={true}
                    ref={filePickerRef} onChange={addImageToPost} />
                <input type="text" maxLength={150}
                    ref={captionRef}
                    className="m-4 border-none text-center w-full focus:ring-0"
                    placeholder="Enter your caption..." />
                <button
                    disabled={!selectedFile || loading}
                    onClick={uploadPost}
                    className="p-2 w-full bg-purple-600 
                text-white rounded
                shadow-md hover:brightness-125 
                disabled:bg-gray-500                
                disabled:cursor-not-allowed">
                    {loading ? `${progresspercent}% Uploading...` : 'Upload Post'}
                </button>
            </div>
        </Modal >
    )
}
