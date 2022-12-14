import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { utilService } from '../services/util.service'

import outOfStockImg from '../assets/img/out-of-stock.png'
import defaultRobotImg from '../assets/img/default-robot.png'

export const RobotPreview = ({ robot, onAddToCart }) => {
    const { pathname } = useLocation()
    return (
        <>
            <Link to={`/robots/${robot._id}`} className="robot-preview" >
                <div className='robo_row'>
                    <h2 className='name'>{robot.name}</h2>
                    <p className='price'>${utilService.numberWithCommas(robot.price)}</p>
                </div>
                <div className='img'><img src={robot.img} alt={robot.name} onError={({ target }) => target.src = defaultRobotImg} /></div>
                {pathname !== '/dashboard' && <p className='created'><strong>created: </strong>{utilService.dateToString(robot.createdAt)}</p>}
                {!robot.inStock && <img className='out-of-stock' src={outOfStockImg} alt="out of stock" />}
                {/* <button className='sp_add_cart flip-in-hor-bottom' onClick={() => { onAddToCart(robot) }}>Add to Cart</button> */}
            </Link>
        </>

    )
}