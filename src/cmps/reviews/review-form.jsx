import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import { IoMdClose } from "react-icons/io";
import { StarRatePicker } from './star-rate'

export const ReviewForm = ({ isOpen, onAddReview, onToggleModal }) => {

    const [review, setReview] = useState({
        title: '',
        rate: 1,
        content: ''
    })

    const handleChange = ({ target: { name, value } }) => {
        setReview({ ...review, [name]: value })
    }

    const onSetRate = (rate) => {
        setReview({ ...review, rate })
    }

    const onSubmit = (ev) => {
        ev.preventDefault()
        onAddReview(review)
        setReview({ title: '', rate: 1, content: '' })
    }

    const { t } = useTranslation()
    return (
        <section className={`review-form ${isOpen ? 'open' : 'close'}`}>
            <span className='modal-close-btn' onClick={onToggleModal}><IoMdClose size={25} /></span>
            <h2 className='sub-header'>{t("review_add")}</h2>
            <form onSubmit={onSubmit}>
                <ul className='clean-list'>
                    <li>
                        <input type="text"
                            name="title"
                            value={review.title}
                            onChange={handleChange}
                            placeholder="Review title"
                            autoFocus
                            required />
                    </li>
                    <li>
                        <StarRatePicker
                            rate={review.rate}
                            maxRate={5}
                            onSetRate={onSetRate} />
                    </li>
                    <li>
                        <textarea
                            name="content"
                            value={review.content}
                            onChange={handleChange}
                            placeholder="Review content (Optional)"
                            required
                        ></textarea>
                    </li>
                </ul>
                <button className='main-btn'>{t("edit_haeder_add")}</button>
            </form>
        </section>
    )
}