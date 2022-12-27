import React, { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { utilService } from '../services/basic/util.service'
import { socketService } from '../services/basic/socket.service'

import outOfStockImg from '../assets/img/out-of-stock.png'
import defaultRobotImg from '../assets/img/default-robot.png'

import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Typography from "@mui/material/Typography";
import { useTranslation } from 'react-i18next'

export const RobotPreview = ({ robot, addToCart, removeCart, onLoadRobots }) => {
    const { pathname } = useLocation()

    useEffect(() => {
        setSocket()
        socketService.off('update-board')
        socketService.on('update-board', async (boardFromSocket) => {
            onLoadRobots(boardFromSocket._id)
        })
    }, [])

    const setSocket = () => {
        try {
            socketService.emit('join-board', robot._id);
        } catch (err) {
            console.log('Cannot load board', err)
        }
    }

    const { t } = useTranslation()
    return (
        <section className='robot-preview'>
            <Link to={`/robots/${robot._id}`} className="info" >
                <div className='robo_row'>
                    <h2 className='name'>{robot.name}</h2>
                    <p className='price'>${utilService.numberWithCommas(robot.price)}</p>
                </div>
                <div className='img'><img src={robot.img} alt={robot.name} onError={({ target }) => target.src = defaultRobotImg} /></div>
                {pathname !== '/dashboard' && <p className='created'><strong>{t("robo_prev")}: </strong>{utilService.dateToString(robot.createdAt)}</p>}
                {!robot.inStock && <img className='out-of-stock' src={outOfStockImg} alt="out of stock" />}
            </Link>
            {pathname === '/robots' &&
                <ButtonGroup size="small" variant="outlined" aria-label="outlined button group" className="add-to-cart">
                    <Button onClick={() => removeCart(robot)}> <RemoveIcon fontSize="small" /> </Button>
                    <Button disabled sx={{ p: 0 }}>
                        <Typography
                            sx={{ paddingLeft: 1, paddingRight: 1, color: "#757575", fontSize: 14, fontWeight: "small", m: 0 }}
                            variant="caption"
                            display="block"
                        >
                            + {t("robo_prev_add")}
                        </Typography>
                    </Button>
                    <Button onClick={() => addToCart(robot)}> <AddIcon fontSize="small" /> </Button>
                </ButtonGroup>
            }
        </section>
    )
}