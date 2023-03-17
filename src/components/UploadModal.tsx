import { modalState } from "@/atom/modalAtom"
import { CameraIcon } from "@heroicons/react/24/outline";
import { useRecoilState } from "recoil"
import Modal from 'react-modal'

export default function UploadModal() {
    const [open, setOpen] = useRecoilState(modalState);
    return (
        <Modal className="max-w-lg w-[90%] h-[300px] 
        fixed top-56 bg-white rounded-sm
        border-1 shadow-md        
        left-[50%] 
        focus:outline-none
        translate-x-[-50%]"
            shouldCloseOnOverlayClick={false}
            isOpen={open}
            onRequestClose={() => setOpen(false)} >
            <div className="flex flex-col justify-center items-center h-[100%]">
                <p>Modal</p>
            </div>
        </Modal >
    )
}
