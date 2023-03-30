export default async function getAllUsers(userId) {
    const res = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)

    if (!res.ok) return undefined

    return res.json()
}
