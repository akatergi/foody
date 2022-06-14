import React from 'react'
import { useState, useEffect } from 'react'
import { addDoc, doc, getDocs, getDoc, query, where } from 'firebase/firestore';
import { postsRef, flairsRef, db } from '../firebase/config';
import { useRouter } from 'next/router';
import { auth } from '../firebase/config';
import { onAuthStateChanged } from 'firebase/auth';

export default function post() {
    const router = useRouter();

    const handleSubmit = (e) => {
        e.preventDefault();
        makeQuery().then((e) => {
            addDoc(postsRef, {
                food, author, authorName, description, score: 0, flairs: e
            }).then(() => {
                router.push("/");
            }).catch(e => console.log(e.message))
        })
    }
    const [food, setFood] = useState("hi")
    const [description, setDescription] = useState("nice food")
    const [author, setAuthor] = useState(null)
    const [authorName, setAuthorName] = useState(null)
    const [flairs, setFlairs] = useState(["yummy"])

    async function makeQuery() {
        var temp = []

        for (let flair of flairs) {
            const q = query(flairsRef, where("name", "==", flair))
            const querySnapshot = await getDocs(q)
            querySnapshot.forEach((doc) => {
                temp.push(doc.ref);
            });
        }

        return temp
    }

    useEffect(() => onAuthStateChanged(auth, user => {
        if (user) {
            setAuthor(doc(db, 'users', user.uid))
            setAuthorName(user.displayName)
        }
    }), [])

    return (
        <form onSubmit={handleSubmit}>
            <h1 style={{ textAlign: 'center' }}>Make a Post!</h1>
            <label htmlFor="food">Food</label>
            <input type="text" id="food" value={food} onChange={(e) => { setFood(e.target.value) }} />
            <label htmlFor="description">description</label>
            <input type="text" id="description" value={description} onChange={(e) => { setDescription(e.target.value) }} />
            <label htmlFor="flairs0">Flairs:</label>

            {flairs.map((f, i) => <input type="text" value={flairs[i]} key={`flairs${i}`} id={`flairs${i}`} onChange={e => {
                var newFlairs = [...flairs]
                newFlairs[i] = e.target.value
                setFlairs(newFlairs)
            }} />)}

            <button onClick={e => { e.preventDefault(); setFlairs([...flairs, ""]) }}>Add Flair</button>
            <button>Submit</button>
        </form>
    )
}
