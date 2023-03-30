import getAllUsers from "/lib/getAllUsers";
import Link from "next/link";

export const metadata = {
    title: "Users"
}

export default async function UsersPage() {
    const usersData = getAllUsers();

    const users = await usersData

    const content = (
        <section>
            <h2>
                <Link href="/">Homepage</Link>
            </h2>
            <br />
            {
                users.map((user) => (
                    <>
                        <p>
                            <Link href={`/users/${user.id}`}>{user.name}</Link>
                        </p>
                        <br/>
                    </>
                ))
            }
        </section>
    )

    return content
}
