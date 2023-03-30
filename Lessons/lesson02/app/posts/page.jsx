import getAllPosts from "/lib/getAllPosts"
import Link from "next/link";

export const metadata = {
    title: "Users"
}

export default async function UsersPage() {
    const postsData = getAllPosts();

    const posts = await postsData

    const content = (
        <section>
            <h2>
                <Link href="/">Homepage</Link>
            </h2>
            <br />
            {
                posts.map((post) => (
                    <>
                        <p>
                            <Link href={`/posts/${post.id}`}>{post.title}</Link>
                        </p>
                        <br/>
                    </>
                ))
            }
        </section>
    )

    return content
}
