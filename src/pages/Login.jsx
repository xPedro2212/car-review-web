import { useState } from "react"
import api from "../services/api"
import { useNavigate } from "react-router-dom"

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            const response = await api.post('/auth/login', { email, password }) 
            localStorage.setItem('token', response.data.token) 
            navigate('/')
        } catch (error) {
            alert('Email ou senha incorretos')
        }

    }
    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Entrar</button>
            </form>
        </div>
    )
}

export default Login