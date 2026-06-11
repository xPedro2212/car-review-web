import { useState } from "react"
import api from "../services/api"
import { useNavigate } from "react-router-dom"

function Register() {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

 async function handleSubmit(e) {
        e.preventDefault()
        try {
            const response = await api.post('/auth/register', { name, email, password }) 
            navigate('/login')
        } catch (error) {
            alert(error.response?.data?.message || 'Erro ao registrar usuário')
        }
      }
    return (
        <div>
            <h1>Register</h1>
                      
            <form onSubmit={handleSubmit}>
              <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
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
                <button type="submit">Registrar</button>
            </form>
        </div>
  )
}

export default Register