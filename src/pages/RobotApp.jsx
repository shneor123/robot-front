import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { AiOutlineSearch } from "react-icons/ai"
import { IoMdCart, IoMdClose } from "react-icons/io";


import { Loader } from '../cmps/general/loader'
import { PageBar } from '../cmps/PageBar'
import { RobotFilter } from '../cmps/RobotFilter'
import { RobotList } from '../cmps/RobotList'
import { loadRobots } from '../store/actions/robot.action'
import { addToCart, removeFromCart, Checkout } from '../store/actions/cart.actions'
import { CartApp } from './CartApp';

export const RobotApp = () => {
    const dispatch = useDispatch()
    const [toggleShow, setToggleShow] = useState(false)
    const { user } = useSelector(storeState => storeState.userModule)
    const { robots, filterBy } = useSelector(storeState => storeState.robotModule)

    useEffect(() => {
        dispatch(loadRobots())
    }, [])

    const onSetFilterBy = (currFilterBy) => {
        dispatch(loadRobots(currFilterBy))
    }

    // const onAddToCart = (cart) => {
    //     dispatch(addToCart(cart))
    // }

    const [isOpenCard, setIsOpenCard] = useState(true)
    const [cartItems, setCartItems] = useState([])

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


    if (!robots) return <Loader />
    return (
        <section className="robot-app main-layout ">
            <div className={`pop-up-menu ${toggleShow ? "menu-open" : ""}`}>
                <p className="back-menu">
                    <button onClick={() => setToggleShow(!toggleShow)}
                        className="btn-opt"><AiOutlineSearch /> Filter cards</button>
                </p>
                {toggleShow && <div className='menu-content-wrapper'>
                    <span style={{ top: '7px' }} onClick={() => setToggleShow(!toggleShow)} className="modal-close-btn">
                        <IoMdClose size={25} />
                    </span>
                    <div className='page-bar-container'>
                        <PageBar filterBy={filterBy} onSetFilterBy={onSetFilterBy} />
                    </div>
                    <RobotFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} />
                    {user && <Link className='add-robot-btn main-btn center-text' to='/robots/edit'>Add new Robot</Link>}
                </div>}
            </div>

            {robots?.length > 0 &&
                <RobotList robots={robots}
                    onAddToCart={onAddToCart}
                    onRemoveCart={onRemoveCart} />
            }

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
        </section >
    )
}