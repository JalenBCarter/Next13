import styles from './styles.module.css'

export default function ExampleLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            <nav>Example Navbar</nav>
            <main className={styles.main}>
                {children}
            </main>
        </>
    )
}