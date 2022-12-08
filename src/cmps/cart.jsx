import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { CartApp } from '../pages/CartApp'
import { addToCart, removeFromCart, Checkout } from '../store/actions/cart.actions'

import { IoMdCart, IoMdClose } from "react-icons/io";

export const Cart = () => {
    const [isOpenCard, setIsOpenCard] = useState(false)
    const [cartItems, setCartItems] = useState([])
    const dispatch = useDispatch()

    const onAddToCart = (product) => {
        const exist = cartItems.find((x) => x._id === product._id)
        if (exist) {
            dispatch(addToCart(setCartItems(cartItems.map((x) => x._id === product._id ? { ...exist, qty: exist.qty + 1 } : x))))
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
        dispatch(Checkout(setCartItems(cartItems.filter(product => product._id === productToRemove))))
    }
    const onToggleCard = () => {
        setIsOpenCard(!isOpenCard)
    }
    return (
        <div className={`pop-up-menu1 ${isOpenCard ? "menu-open" : ""}`}>
            
            <p className="back-menu">
                <button onClick={() => setIsOpenCard(!isOpenCard)}
                    className='btn-svg'> <IoMdCart size={25} />
                    <span className='shop-icon'>{cartItems.length}</span>
                </button>
            </p>
            {isOpenCard && <div className='menu-content-wrapper'>
                <button className="admin-clear-cart " onClick={onClearCart}>Clear Cart</button>
                <span style={{ top: '7px' }} onClick={() => setIsOpenCard(!isOpenCard)} className="modal-close-btn">
                    <IoMdClose size={25} />
                </span>
                <CartApp cartItems={cartItems}
                    onAddToCart={onAddToCart}
                    onRemoveCart={onRemoveCart}
                    onToggleCard={onToggleCard}
                    onClearCart={onClearCart}
                />
            </div>}
        </div>
    )
}
