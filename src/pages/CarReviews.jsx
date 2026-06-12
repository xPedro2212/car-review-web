import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import api from '../services/api'

function CarReviews() {
    const [review, setReview] = useState([])
    const { id } = useParams()

    useEffect(() => {
        api.get('/reviews/car/' + id)
            .then(response => setReview(response.data))
    }, [id])

    return (
        <div>
            <h1>Reviews</h1>
                       {review.map((review) => (
                <div key={review.id}>
                    <p>{review.title} {review.body} {review.rating}</p>
                </div>
            ))}
        </div>
    )

}
export default CarReviews