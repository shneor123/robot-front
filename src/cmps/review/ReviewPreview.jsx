import React from 'react'
import { Link } from 'react-router-dom'
import { utilService } from '../../services/util.service'

export const ReviewPreview = ({ review, isShowWriter, isShowRobot, onRemoveReview }) => {

    const getDate = (date) => {
        return utilService.dateToString(date)
    }

    const getStars = (num) => {
        const str = num === 0 ?
            '-no rate specified-' : String.fromCharCode(9733).repeat(num)
        return str
    }

    return (
        <div className="robot-review" >
            <div>
                <strong>Title:{" "}</strong>
                {review.title}
            </div>
            <div>
                <strong>Rate:{" "}</strong>
                {getStars(review.rate)}
            </div>
            <p>
                <strong>Content:{" "}</strong>
                {review.content}
            </p>
            <button className='delete-btn' onClick={() => onRemoveReview(review._id)}> &times;</button>
            <footer className="preview-footer">
                {isShowWriter && <>
                    <p>Written by: </p>
                    <Link to={`/users/${review.byUser._id}`} className='writer'>{review.byUser.fullname}</Link>
                    <p className='date'>{getDate(review.createdAt)}</p>
                </>}
                {isShowRobot && <>
                    <p>Robot: </p>
                    <Link to={`/robots/${review.byRobot._id}`} className='writer'>{review.byRobot.name}</Link> |
                    <p>Price: {review.byRobot.price}</p> |
                    <p>Seller: </p>
                    <Link to={`/users/${review.byRobot.owner._id}`} className='writer'>{review.byRobot.owner.fullname}</Link> |
                    <p className='date'>Date: {getDate(review.createdAt)}</p>
                </>}
            </footer>
        </div>
    )
}