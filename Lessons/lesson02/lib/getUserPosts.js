export default async function getAllUsers(userId) {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`, { next: { revalidate: 60 } })

    if (!res.ok) return undefined

    return res.json()
}
