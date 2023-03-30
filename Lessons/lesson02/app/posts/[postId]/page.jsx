import getPost from '/lib/getPost'
import getPostComments from '/lib/getPostComments'
import getAllPosts from '/lib/getAllPosts'
import { notFound } from 'next/navigation'

export default async function UserPage({ params: { postId } }) {
    const postData = getPost(postId)
    const postCommentsData = getPostComments(postId)

    // Parallel fetching user and post data:
    const [post, postComments] = await Promise.all([postData, postCommentsData])


    if (!post.title) return notFound()

    return (
        <>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
            <br />
            {
                postComments.map((comment) =>
                (<>
                    <h3>{comment.email}</h3>
                    <p>{comment.body}</p>
                    <br />
                </>)
                )
            }
        </>
    )
}

export async function generateStaticParams() {
    const postsData = getAllPosts()
    const posts = await postsData

    return posts.map(post => ({
        postId: post.id.toString()
    }))
}
