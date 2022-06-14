import { React, useState } from 'react'
import { auth } from '../firebase/config'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'next/router';

export default function login() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const router = useRouter()

    const handleSubmit = e => {
        e.preventDefault()
        signInWithEmailAndPassword(auth, email, password).then(router.push("/posts")).catch(e => console.log(e.message))
    }

    return (
        <form onSubmit={handleSubmit}>
            <h1>Register</h1>
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} />
            <label htmlFor="password">password:</label>
            <input type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} />
            <button>Login</button>
        </form>
    )
}
