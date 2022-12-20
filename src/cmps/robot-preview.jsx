import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { utilService } from '../services/util.service'

import outOfStockImg from '../assets/img/out-of-stock.png'
import defaultRobotImg from '../assets/img/default-robot.png'

import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Typography from "@mui/material/Typography";

export const RobotPreview = ({ robot, addToCart, removeCart }) => {
    const { pathname } = useLocation()
    return (
        <section className='robot-preview'>
            <Link to={`/robots/${robot._id}`} className="info" >
                <div className='robo_row'>
                    <h2 className='name'>{robot.name}</h2>
                    <p className='price'>${utilService.numberWithCommas(robot.price)}</p>
                </div>
                <div className='img'><img src={robot.img} alt={robot.name} onError={({ target }) => target.src = defaultRobotImg} /></div>
                {pathname !== '/dashboard' && <p className='created'><strong>created: </strong>{utilService.dateToString(robot.createdAt)}</p>}
                {!robot.inStock && <img className='out-of-stock' src={outOfStockImg} alt="out of stock" />}
            </Link>
            {pathname === '/robots' &&
                <ButtonGroup size="small" variant="outlined" aria-label="outlined button group" className="add-to-cart">
                    <Button onClick={() => removeCart(robot)}> <RemoveIcon fontSize="small" /> </Button>
                    <Button disabled sx={{ p: 0 }}> <Typography /> </Button>
                    <Button onClick={() => addToCart(robot)}> <AddIcon fontSize="small" /> </Button>
                </ButtonGroup>
            }
        </section>
    )
}