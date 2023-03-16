import Posts from "./Posts";
import Stories from "./Stories";


export default function Feeds() {
    return (
        <main className="grid grid-cols-1 
        md:grid-cols-3
        md:max-w-6xl mx-auto">
            <section className="md:col-span-2">
                <Stories />
                <Posts />
            </section>
            <section className="hidden md:col-span-1 md:inline-grid">

            </section>
        </main>
    )
}
