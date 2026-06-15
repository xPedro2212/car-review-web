import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import api from '../services/api'

function CarReviews() {
    const [reviews, setReviews] = useState([])
    const { id } = useParams()
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [rating, setRating] = useState(5)

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
    }, [id])

    return (
        <div>
            <h1>Reviews</h1>
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
                <div key={reviews.id}>
                    <p>{review.title} {review.body} {review.rating}</p>
                </div>



            ))}
        </div>
    )

}
export default CarReviews