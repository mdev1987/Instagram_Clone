import { modalState } from "@/atom/modalAtom"
import { useRecoilState } from "recoil"

export default function UploadModal() {
    const [open, setOpen] = useRecoilState(modalState);
    return (
        <>
            <h2>Create Post</h2>
            {open &&
                <>
                    <p>The Modal is open</p>
                    <button onClick={() => setOpen(false)}>Close</button>
                </>
            }
        </>
    )
}
