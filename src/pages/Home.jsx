import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'
function Home() {
    const [cars, setCars] = useState([])
    const [search, setSearch] = useState('')
    const navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            const response = await api.get('/cars?brand=' + search) 
            setCars(response.data)
        } catch (error) {
            alert(error.response?.data?.message || 'Email ou senha incorretos')
        }

    }
    return (
        <div>
            <h1>Home</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Buscar"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <button type="submit">Buscar</button>
            </form>
            {cars.map((car) => (
                <div key={car.id} onClick={() => navigate ('/cars/' + car.id)} style={{cursor:'pointer'}}>
                    <p>{car.brand} {car.model} {car.year}</p>
                </div>
            ))}
        </div>
    
  )
}

export default Home