import React from 'react'
import styles from './PostCard.module.css'
import Link from "next/link";

export default function PostCard({ post }) {
    return (
        <Link href={`/posts/${post.id}`}>
            <div className={styles.post}>
                <h1 className={styles.foodname}> {post.food} </h1>
                <div className={styles.content}>
                    <div className={styles.score}>
                        <button> ↑ </button>
                        <div> {post.score} </div>
                        <button> ↓ </button>
                    </div>
                    <div className="postInfo">
                        <h3 className={styles.author}>{post.author}</h3>
                        <p> {post.description} </p>
                    </div>
                </div>
            </div>
        </Link>
    )
}
