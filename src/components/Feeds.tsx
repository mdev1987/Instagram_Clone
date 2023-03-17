import { useSession } from "next-auth/react";
import MiniProfile from "./MiniProfile";
import Posts from "./Posts";
import Stories from "./Stories";
import Suggestions from "./Suggestions";


export default function Feeds() {
    const { data: session } = useSession()
    return (
        <main className={`grid grid-cols-1         
        ${session ? "md:grid-cols-3 md:max-w-6xl mx-auto"
                : "md:grid-cols-2 md:max-w-3xl mx-auto"}`}>
            <section className="md:col-span-2">
                <Stories />
                <Posts />
            </section>
            <section className={`hidden md:col-span-1 md:inline-grid`}>
                {session && (<div>
                    <MiniProfile />
                    <Suggestions />
                </div>)}
            </section>
        </main>
    )
}
