import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { AiOutlineSearch } from "react-icons/ai"
import { IoMdClose } from "react-icons/io";


import { Loader } from '../cmps/general/loader'
import { PageBar } from '../cmps/PageBar'
import { RobotFilter } from '../cmps/RobotFilter'
import { RobotList } from '../cmps/RobotList'
import { loadRobots } from '../store/actions/robot.action'
import { addToCart } from '../store/actions/cart.actions'

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

    const onAddToCart = (cart) => {
        dispatch(addToCart(cart))
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
            {robots?.length > 0 && <RobotList robots={robots}  onAddToCart={onAddToCart} />}
        </section>
    )
}