import { Link } from 'react-router-dom'
import { utilService } from '../../services/util.service'

export const ReviewPreview = ({ review, isShowWriter, isShowRobot }) => {

    const getDate = (date) => {
        return utilService.dateToString(date)
    }
    const getStars = (num) => {
        return '★'.repeat(num)
    }

    return <li className="review-preview">
        <p className="title">{review.title}</p>
        <p className="rate">Rate: {getStars(review.rate)}</p>
        <p className="content">{review.content}</p>
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
    </li>
}