import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { utilService } from '../services/util.service'

import outOfStockImg from '../assets/img/out-of-stock.png'
import defaultRobotImg from '../assets/img/default-robot.png'

export const RobotPreview = ({ robot, onAddToCart }) => {
    const { pathname } = useLocation()
    const navigate = useNavigate()


    const handleKeyEvent = (e) => {
        if (e.key === "Escape") navigate(-1);
    };

    return (
        <>
            <Link to={`/robots/${robot._id}`} className="robot-preview"   abIndex={"0"}  onKeyDown={handleKeyEvent} >
                <div className='robo_row'>
                    {/* <h2 className='name'>{robot.name.length > 10 ? robot.name.substring(0, 10) + '...' : robot.name}</h2> */}
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