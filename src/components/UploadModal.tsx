import { modalState } from "@/atom/modalAtom"
import { CameraIcon } from "@heroicons/react/24/outline";
import { useRecoilState } from "recoil"
import Modal from 'react-modal'
import React, { useRef, useState } from "react";

export default function UploadModal() {
    const [open, setOpen] = useRecoilState(modalState);
    const [selectedFile, setSelectedFile] = useState<File | null>()
    const filePickerRef = useRef<HTMLInputElement>(null);
    const addImageToPost = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { files } = event.target;
        setSelectedFile(files?.[0])
    }
    const onCloseModal = () => {
        setSelectedFile(null);
        setOpen(false);
    }
    return (
        <Modal className="max-w-lg w-[90%] p-8
        fixed top-40 bg-white rounded-sm
        border-1 shadow-md        
        left-[50%] 
        focus:outline-none
        translate-x-[-50%]"
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
                    className="m-4 border-none text-center w-full focus:ring-0"
                    placeholder="Enter your caption..." />
                <button className="p-2 w-full bg-purple-600 
                text-white rounded
                shadow-md hover:brightness-125 
                disabled:brightness-100
                disabled:cursor-not-allowed">Upload Post</button>
            </div>
        </Modal >
    )
}
