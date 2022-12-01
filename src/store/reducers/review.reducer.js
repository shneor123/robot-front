const initialState = {
    reviews: [],
}

export function reviewReducer(state = initialState, action) {
    let reviews

    switch (action.type) {
        case 'SET_REVIEWS':
            return { ...state, reviews: action.reviews }
        case 'ADD_REVIEW':
            reviews = [...state.reviews, action.review]
            return { ...state, reviews }
        case 'UPDATE_REVIEW':
            reviews = state.reviews.map(review => review._id !== action.review.id ? action.review : review)
            return { ...state, reviews }
        case 'REMOVE_REVIEW':
            reviews = state.reviews.filter(review => review._id !== action.reviewId)
            return { ...state, reviews }
        default:
            return state
    }
}