import { db, postsRef } from "../firebase/config"
import { useEffect, useState } from "react"
import { getDocs, onSnapshot } from "firebase/firestore";

import PostCard from "../components/PostCard";
import styles from '../components/allPosts.module.css'

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true)

    onSnapshot(postsRef, snapshot => {
      let temp = []

      snapshot.docs.forEach(doc => {
        temp.push({ ...doc.data(), id: doc.id })
      })

      setPosts(temp)
    })

    setLoading(false)
  }, [])

  return (
    <div className={styles.allPosts}>
      {loading ? <h1>Loading... </h1> : posts.map(p => <PostCard key={p.id} post={p} />)}
    </div>
  )
}
