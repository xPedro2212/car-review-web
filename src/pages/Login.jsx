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
            alert(error.response?.data?.message || 'Email ou senha incorretos')
        }

    }
    return (
        <div className="min-h-screen bg-[#D8D2E1] flex items-center justify-center">
            <div className="flex rounded-lg shadow-lg overflow-hidden w-3/4 max-w-3xl">
                <div className="w-1/2 flex flex-col items-center justify-center text-white p-12" style={{background: 'linear-gradient(135deg, #B88E8D, #a855f7)'}}>
                    <h2 className="text-3xl font-bold mb-4"> Bem vindo! </h2>
                    <p className="text-center text-purple-200">
                        Faça login para ver e compartilhar experiências com seu veículo.
                    </p>
                </div>

                <div className="bg-white w-1/2 flex flex-col items-center justify-center p-12">
                    <h1 className="text-2xl font-bold text-gray-800 mb-6">Sign in</h1>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-sm">
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                        <input
                            type="password"
                            placeholder="Senha"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />

                        <button
                            type="submit"
                            className="bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition"

                        >
                            Entrar
                        </button>
                        <p className="text-center text-gray-500 text-sm">
                            Não tem conta?{' '}
                            <a href="/register" className="text-purple-600 hover:underline">
                                Cadastre-se
                            </a>
                        </p>

                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login