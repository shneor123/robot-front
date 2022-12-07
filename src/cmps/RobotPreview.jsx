import React from 'react'
import { utilService } from '../services/util.service'
import outOfStockImg from '../assets/img/out-of-stock.png'
// import saleRobot from '../assets/img/sale-robot.png'
import defaultRobotImg from '../assets/img/default-robot.png'
import { Link, useLocation } from 'react-router-dom'

export const RobotPreview = ({ robot, onAddToCart }) => {
    const { pathname } = useLocation()
    return (
        <>
            <Link to={`/robots/${robot._id}`}
                // className={`${pathname === '/robots' ? 'robot-preview' : 'robot-preview-2'}`}>

                className="robot-preview">
                <div className='toy_row'>
                    <h2 className='name'>{robot.name}</h2>
                    <p className='price'>${utilService.numberWithCommas(robot.price)}</p>
                </div>
                <div className='img'>
                    <img src={robot.img} alt={robot.name} onError={({ target }) => target.src = defaultRobotImg} />
                </div>
                {pathname !== '/dashboard' && <p className='created'><strong>created: </strong>{utilService.dateToString(robot.createdAt)}</p>}
                {!robot.inStock && <img className='out-of-stock' src={outOfStockImg} alt="out of stock" />}
                {/* {robot.price < 60 && <img className='sale-robot' src={saleRobot} alt="out of stock" />} */}
                {/* <button className='sp_add_cart flip-in-hor-bottom' onClick={() => { onAddToCart(robot) }}>Add to Cart</button> */}
            </Link>
        </>

    )
}