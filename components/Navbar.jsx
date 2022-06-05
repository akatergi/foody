import React from 'react'
import Link from 'next/dist/client/link'
import styles from './Navbar.module.css'

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
        <Link href="/posts">Posts</Link>
        <Link href="/post">Make Post</Link>
    </nav>
  )
}