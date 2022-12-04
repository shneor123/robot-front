import React from 'react'
import { utilService } from '../services/util.service'
import outOfStockImg from '../assets/img/out-of-stock.png'
import defaultRobotImg from '../assets/img/default-robot.png'
import { Link } from 'react-router-dom'

export const RobotPreview = ({ robot }) => {
    return (
        <Link to={`/robots/${robot._id}`} className="robot-preview">
            <div className='toy_row'>
                <h2 className='name'>{robot.name}</h2>
                <p className='price'>${utilService.numberWithCommas(robot.price)}</p>
            </div>
            <img className='img' src={robot.img} alt={robot.name} onError={({ target }) => target.src = defaultRobotImg} />
            {/* <p className='created'><strong>created: </strong>{utilService.dateToString(robot.createdAt)}</p> */}
            {!robot.inStock && <img className='out-of-stock' src={outOfStockImg} alt="out of stock" />}
        </Link>
    )
}
