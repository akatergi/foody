import React, { useEffect } from 'react'
import styles from './DisplayPost.module.css'

export default function DisplayPost({ post, handleClick }) {
    return (
        <>
            <h1>{post.food}</h1>
            <p> - {post.author.name}</p>
            <h4>Flairs:</h4>

            {post.flairs.map(f => <div className={styles.flair}
                style={{ backgroundColor: f.color, color: f.color2, borderColor: f.color2 }}
                key={f.name}> {f.name} </div>)}

            <p> {post.description} </p>

            <button onClick={handleClick}>Delete Food</button>
        </>
    )
}