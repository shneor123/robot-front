import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AiOutlineSearch } from "react-icons/ai"
import { IoMdClose } from "react-icons/io";
import { FaShoppingCart } from "react-icons/fa";

import { Loader } from '../cmps/general/loader'
import { RobotFilter } from '../cmps/robot-filter'
import { RobotList } from '../cmps/robot-list'

import { loadRobots } from '../store/actions/robot.action'
import { socketService } from '../services/socket.service';
import { useParams } from 'react-router-dom';
import { addToCart, checkout, removeFromCart } from '../store/actions/cart.actions';
import { CartApp } from './cart-app';

export const RobotApp = () => {
    const { robots, filterBy } = useSelector(storeState => storeState.robotModule)
    const { user } = useSelector(storeState => storeState.userModule)
    const [toggleShow, setToggleShow] = useState(false)
    const [isOpenCard, setIsOpenCard] = useState(false)
    const [cartItems, setCartItems] = useState([])
    const dispatch = useDispatch()
    const params = useParams()

    useEffect(() => {
        onLoadRobots()
        setSocket()
        socketService.off('update-board')
        socketService.on('update-board', async (boardFromSocket) => {
            onLoadRobots(boardFromSocket._id)
        })
    }, [])

    const setSocket = () => {
        try {
            socketService.emit('join-board', params._id);
        } catch (err) {
            console.log('Cannot load board', err)
        }
    }

    const onLoadRobots = () => {
        dispatch(loadRobots(params._id))
    }

    const onSetFilterBy = (currFilterBy) => {
        dispatch(loadRobots(currFilterBy))
    }

    const onAddToCart = (product) => {
        const exist = cartItems.find((x) => x._id === product._id)
        if (exist) {
            const addInCart = setCartItems(cartItems.map((x) => x._id === product._id ? { ...exist, qty: exist.qty + 1 } : x))
            dispatch(addToCart(addInCart))
        } else {
            dispatch(addToCart(setCartItems([...cartItems, { ...product, qty: 1 }])))
        }
    }
    const onRemoveCart = (product) => {
        const exist = cartItems.find((x) => x._id === product._id)
        if (exist.qty === 1) {
            dispatch(removeFromCart(setCartItems(cartItems.filter((x) => x._id !== product._id))))
        } else {
            dispatch(removeFromCart(setCartItems(cartItems.map((x) => x._id === product._id ? { ...exist, qty: exist.qty - 1 } : x))))
        }
    }
    const onClearCart = (productToRemove) => {
        dispatch(checkout(setCartItems(cartItems.filter(product => product._id === productToRemove))))
    }
    const onToggleCard = () => {
        setIsOpenCard(!isOpenCard)
    }


    if (!robots) return <Loader />
    return (
        <section className="robot-app main-layout ">
            <div className={`${toggleShow ? "sidebar open" : "sidebar"}`}>
                <button onClick={() => setToggleShow(!toggleShow)} className={`sidebar-toggle ${toggleShow ? "hide" : ""}`} >
                    <AiOutlineSearch /> Filter cards
                </button>
                {toggleShow && <div className='menu-content-wrapper'>
                    <span onClick={() => setToggleShow(!toggleShow)} className="modal-close-btn"> <IoMdClose size={25} /> </span>
                    <RobotFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} user={user} />
                </div>}
            </div>
            <section className="main-layout ">
                <button onClick={onToggleCard} className='btn-svg'> <FaShoppingCart /><span className='shop-icon'>{cartItems.length}</span></button>
                {isOpenCard && <div className='cart-app slide-in-right'>
                    <CartApp
                        cartItems={cartItems}
                        onAddToCart={onAddToCart}
                        onRemoveCart={onRemoveCart}
                        onToggleCard={onToggleCard}
                        onClearCart={onClearCart}
                    />
                </div>}
            </section>
            {robots?.length > 0 && <RobotList robots={robots} onAddToCart={onAddToCart} onRemoveCart={onRemoveCart} />}
        </section >
    )
}