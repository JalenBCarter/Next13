import getUser from '/lib/getUser'
import getUserPosts from '/lib/getUserPosts'
import getAllUsers from '/lib/getAllUsers'
import { Suspense } from 'react'
import UserPosts from './components/UserPosts'
import { notFound } from 'next/navigation'

export async function GenerateMetadata({ params: { userId } }) {
    const userData = getUser(userId)
    const user = await userData
    
    if (!user.name) {
        return {
            title: 'User not found',
        }
    }

    return { 
        title: user.name,
        description: `this is the page of ${user.name}`,
    }
}

export default async function UserPage({ params: { userId } }) {
    const userData = getUser(userId)
    const userPostsData = getUserPosts(userId)

    // Parallel fetching user and post data:
    // const [user, userPosts] = await Promise.all([userData, userPostsData])
    
    const user = await userData
    
    if (!user.name) return notFound()
    
    return (
        <>
            <h2>{user.name}</h2>
            <Suspense fallback="Loading...">
                <UserPosts promise={userPostsData} />
            </Suspense>
        </>
    )
}

export async function generateStaticParams() {
    const usersData = getAllUsers()
    const users = await usersData

    return users.map(user => ({
        userId: user.id.toString()
    }))
}
