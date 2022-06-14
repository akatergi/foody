import { React, useState } from 'react'
import { auth } from '../firebase/config'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'

export default function register() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = e => {
        e.preventDefault()
        createUserWithEmailAndPassword(auth, email, password).then(() => console.log("Account made!")).catch(e => console.log(e.message))
    }

    return (
        <form onSubmit={handleSubmit}>
            <h1>Register</h1>
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} />
            <label htmlFor="password">password:</label>
            <input type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} />
            <button>Register</button>
        </form>
    )
}
