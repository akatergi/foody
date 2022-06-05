import React from 'react'
import { useState } from 'react'
import { addDoc, getDocs, getDoc, query, where } from 'firebase/firestore';
import { postsRef, flairsRef } from '../firebase/config';
import { useRouter } from 'next/router';

export default function post() {
    const router = useRouter();

    const handleSubmit = (e) => {
        e.preventDefault();
        makeQuery().then((e) => {
            addDoc(postsRef, {
                food, author, description, score: 0, flairs: e
            }).then(() => {
                router.push("/");
            }).catch(e => console.log(e.message))
        })
    }
    const [food, setFood] = useState("hi")
    const [author, setAuthor] = useState("adel")
    const [description, setDescription] = useState("nice food")
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

    return (
        <form onSubmit={handleSubmit}>
            <h1 style={{ textAlign: 'center' }}>Make a Post!</h1>
            <label htmlFor="food">Food</label>
            <input type="text" id="food" value={food} onChange={(e) => { setFood(e.target.value) }} />
            <label htmlFor="author">Author</label>
            <input type="text" id="author" value={author} onChange={(e) => { setAuthor(e.target.value) }} />
            <label htmlFor="description">description</label>
            <input type="text" id="description" value={description} onChange={(e) => { setDescription(e.target.value) }} />
            <label htmlFor="flairs0">Flairs:</label>

            {flairs.map((f, i) => <input type="text" value={flairs[i]} key={`flairs${i}`} id={`flairs${i}`} onChange={e => {
                var newFlairs = [...flairs]
                newFlairs[i] = e.target.value
                setFlairs(newFlairs)
            }} />)}

            <button onClick={e => { e.preventDefault(); setFlairs([...flairs, ""]) }}>Add Flair</button>
            <button onClick={makeQuery}>HAAGH</button>
            <button>Submit</button>
        </form>
    )
}
