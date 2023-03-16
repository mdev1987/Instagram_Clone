import Posts from "./Posts";
import Stories from "./Stories";


export default function Feeds() {
    return (
        <main>
            <section>
                <Stories />
                <Posts />
            </section>
            <section></section>
        </main>
    )
}
