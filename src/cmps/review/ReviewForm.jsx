import { useState } from 'react'
import { StarRatePicker } from './StarRate'

export const ReviewForm = ({ isOpen, onAddReview }) => {

    const [review, setReview] = useState({
        title: '',
        rate: 4,
        content: ''
    })

    const handleChange = (ev) => {
        const { name, value } = ev.target
        if (name === 'rate') value = +value
        setReview({ ...review, [name]: value })
    }

    const onSetRate = (rate) => {
        setReview((prevState) => ({ ...prevState, rate }))
    }

    const onSubmit = (ev) => {
        ev.preventDefault()
        onAddReview(review)
        setReview({ title: '', rate: 1, content: '' })
    }

    return (
      <section className={`review-form ${isOpen ? 'open' : 'close'}`}> 
            <h2 className='sub-header'>Add a review</h2>
            <form onSubmit={onSubmit}>
                <ul className='clean-list'>
                    <li>
                        <input type="text"
                            name="title"
                            value={review.title}
                            onChange={handleChange}
                            placeholder="Review title"
                            autoFocus
                            required
                        />
                    </li>

                    <li>
                        <StarRatePicker
                            rate={review.rate}
                            maxRate={5}
                            onSetRate={onSetRate}
                        />
                    </li>

                    <li>
                        <textarea name="content"
                            value={review.content}
                            onChange={handleChange}
                            placeholder="Review content (Optional)" >
                        </textarea>
                    </li>
                </ul>
                <button className='main-btn'>Add</button>
            </form>
        </section>
    )
}