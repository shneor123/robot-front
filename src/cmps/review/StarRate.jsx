import fullStar from '../../assets/img/star-full2.png'
import emptyStar from '../../assets/img/star-empty.png'
import { useState } from 'react'

export const StarRatePicker = ({ rate, maxRate, onSetRate }) => {

    const [tempRate, setTempRate] = useState(rate)

    const getStars = () => {
        const stars = []
        for (let i = 0; i < tempRate; i++) {
            stars.push(<img src={fullStar} alt="full-star" />)
        }
        for (let i = tempRate; i < maxRate; i++) {
            stars.push(<img src={emptyStar} alt="empty-star" />)
        }
        return stars
    }

    return <section className="star-rate-picker">
        {getStars().map((star, idx) => <span key={idx} className="star"
            onMouseEnter={() => setTempRate(idx + 1)}
            onMouseLeave={() => setTempRate(rate)}
            onClick={() => onSetRate(tempRate)}>
            {star}
        </span>)}
    </section>
}