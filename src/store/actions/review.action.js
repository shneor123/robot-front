import { reviewService } from '../../services/review.service'

export function loadReviews(filterBy) {
    return async dispatch => {
        try {
            const reviews = await reviewService.query(filterBy)
            dispatch({ type: 'SET_REVIEWS', reviews })
        } catch (err) {
            console.error('Error:', err)
            dispatch(({ type: 'SET_USER_MSG', msg: { type: 'danger', msg: 'Failed loading reviews' } }))
        }
    }
}

export function saveReview(review) {
    return async dispatch => {
        const actionType = review._id ? 'UPDATE_REVIEW' : 'ADD_REVIEW'
        const userMsg = review._id ? 'Review updated successfully' : 'Review was added successfully'
        try {
            const savedReview = await reviewService.save(review)
            dispatch({ type: actionType, review: savedReview })
            dispatch(({ type: 'SET_USER_MSG', msg: { type: 'success', msg: userMsg } }))
        } catch (err) {
            console.error('Error:', err)
            dispatch(({ type: 'SET_USER_MSG', msg: { type: 'danger', msg: 'Failed updating review' } }))
        }
    }
}

export function removeReview(reviewId) {
    return async dispatch => {
        try {
            await reviewService.remove(reviewId)
            dispatch({ type: 'REMOVE_REVIEW', reviewId })
            dispatch(({ type: 'SET_USER_MSG', msg: { type: 'success', msg: 'Review removed successfully' } }))
        } catch (err) {
            console.error('Error:', err)
            dispatch(({ type: 'SET_USER_MSG', msg: { type: 'danger', msg: 'Failed removing review' } }))
        }
    }
}