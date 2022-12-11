import React from 'react'
import { ReviewPreview } from './ReviewPreview'

export const ReviewList = ({ reviews, isShowWriter, isShowRobot, onRemoveReview }) => {
    const reversedList = (list) => {
        return [...list].sort((a, b) => (new Date(a.createdAt)).getTime() < (new Date(b.createdAt)).getTime() ? 1 : -1)
    }
    return (
        <ol className="review-previews" reversed>
            {reversedList(reviews).map(review =>
                <ReviewPreview
                    key={review._id}
                    review={review}
                    isShowWriter={isShowWriter}
                    isShowRobot={isShowRobot}
                    onRemoveReview={onRemoveReview}
                />
            )}
        </ol>
    )
}