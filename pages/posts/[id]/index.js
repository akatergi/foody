import React, { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/router'
import { getDoc, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../../../firebase/config';
import DisplayPost from '../../../components/DisplayPost';

export default function index({ id }) {
    const [post, setPost] = useState(null)
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(true)
    const router = useRouter()

    const getFlairs = useCallback(async (flairs) => {
        var temp = []

        for (let flair of flairs) {
            const flairDoc = await getDoc(flair)
            temp.push(flairDoc.data())
        }

        return temp
    }, [])

    useEffect(() => {

        const docRef = doc(db, 'posts', id)
        getDoc(docRef).then(doc => {
            if (doc.data()) {
                var post = doc.data()
                getFlairs(post.flairs).then(f => {
                    post.flairs = f;
                    getDoc(post.author).then(t => {
                        const { name } = t.data()
                        post.author = { name, id: t.id }
                        setPost(post)
                        setLoading(false)
                    }
                    )
                })
            } else {
                setError("Could not find that post!")
                setLoading(false)
            }
        })
    }, [getFlairs])

    const handleClick = () => {
        const docRef = doc(db, 'posts', id)
        deleteDoc(docRef).then(() => {
            router.push("/posts")
        })
    }

    return (
        <>
            {loading ? <h1>Loading...</h1> :
                error ? <h1>{error}</h1> : <DisplayPost post={post} handleClick={handleClick} />
            }
        </>
    )
}

export async function getServerSideProps(context) {
    const { id } = context.params;
    return {
        props: {
            id
        }, // will be passed to the page component as props
    }
}
