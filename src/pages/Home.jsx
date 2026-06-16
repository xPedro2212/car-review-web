import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'
import Navbar from '../components/Navbar'


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
        <>
            <Navbar />

            <div className='bg-[#D8D2E1] min-h-screen'>
                <div className='flex flex-col items-center pt-12 pb-8'>
                    <h2 className='text-2xl font-bold text-gray-800 mb-6'>Encontre seu próximo carro</h2>
                    <form onSubmit={handleSubmit} className='flex gap-2 w-full max-w-md px-4'>
                        <input
                            type="text"
                            placeholder="Buscar por marca ou modelo"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className='flex-1 border bg-white border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500'
                        />
                        <button className='bg-purple-600  text-white px-6 py-2 rounded hover:bg-purple-700 transition' type="submit">Buscar</button>
                    </form>
                </div>
                

                <div className='grid grid-cols-1 md:grid-cols-3 gap-6 px-8 pb-12 max-w-5xl mx-auto'>
                    {cars.map((car) => (
                        <div 
                        key={car.id}
                        onClick={() => navigate('/cars/' + car.id)}
                        className='bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-xl transition' >
                            <h3 className='text-lg font-bold text-gray-800'>{car.brand} {car.model}</h3> 
                            <p className='text-gray-500'>    {car.year} {car.version}</p>
                        </div>
                    ))}
                </div>
                </div>
            </>

            )
}

 export default Home