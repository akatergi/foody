import React, { useState } from 'react'
import Link from 'next/dist/client/link'
import styles from './Navbar.module.css'
import { auth } from '../firebase/config'
import { onAuthStateChanged } from 'firebase/auth'

export default function Navbar() {
  const [loggedIn, setLoggedIn] = useState(auth.currentUser ? true : false)
  onAuthStateChanged(auth, user => {
    user ? setLoggedIn(true) : setLoggedIn(false)
  })
  return (
    <nav className={styles.navbar}>
      <Link href="/posts">Posts</Link>
      <Link href="/post">Make Post</Link>
      {loggedIn ?
        <button onClick={() => auth.signOut()}> Logout </button> : <>
          <Link href="/register"> Register </Link>
          <Link href="/login"> Login </Link>
        </>
      }
    </nav>
  )
}