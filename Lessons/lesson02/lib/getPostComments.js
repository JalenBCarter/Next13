export default async function getPostComments(postId) {
    const res = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`, { next: { revalidate: 60 } })

    if (!res.ok) return undefined

    return res.json()
}
