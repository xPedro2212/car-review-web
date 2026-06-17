import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import api from '../services/api'
import Navbar from '../components/Navbar'

function CarReviews() {
    const [reviews, setReviews] = useState([])
    const { id } = useParams()
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [rating, setRating] = useState(5)
    const [car, setCar] = useState('')

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            const response = await api.post('/reviews', { title, body, rating, carId: id })
            setTitle('')
            setBody('')
            setRating(5)
            const updated = await api.get('/reviews/car/' + id)
            setReviews(updated.data)

        } catch (error) {
            alert(error.response?.data?.message || 'Erro ao enviar review')
        }

    }

    useEffect(() => {
        api.get('/reviews/car/' + id)
            .then(response => setReviews(response.data))

        api.get('/cars/' + id)
            .then(response => setCar(response.data))
    }, [id])


    return (
        <>
            <Navbar />
            <div>
                <div>
                    <h3 className='text-lg font-bold text-gray-800'>{car.brand} {car.model}</h3>
                    <p className='text-gray-500'>    {car.year} {car.version}</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Título"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <textarea
                        placeholder="Comentário"
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                    />
                    <label>
                        Rating:
                        <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                        </select>
                    </label>
                    <button type="submit">Enviar</button>
                </form>

                {reviews.map((review) => (
                    <div key={review.id}>
                        <p>{review.title} {review.body} {review.rating}</p>
                    </div>



                ))}
            </div>
        </>
    )

}
export default CarReviews