import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AiOutlineSearch } from "react-icons/ai"
import { IoMdClose } from "react-icons/io";

import { Loader } from '../cmps/general/loader'
import { RobotFilter } from '../cmps/robot-filter'
import { RobotList } from '../cmps/robot-list'

import { loadRobots } from '../store/actions/robot.action'
import { socketService } from '../services/socket.service';
import { useParams } from 'react-router-dom';

export const RobotApp = () => {
    const { robots, filterBy } = useSelector(storeState => storeState.robotModule)
    const { user } = useSelector(storeState => storeState.userModule)
    const [toggleShow, setToggleShow] = useState(false)
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

    if (!robots) return <Loader />
    return (
        <section className="robot-app main-layout ">
            <div className={`pop-up-menu ${toggleShow ? "menu-open" : ""}`}>
                <div className="back-menu">
                    <button onClick={() => setToggleShow(!toggleShow)}
                        className={`btn-opt ${toggleShow ? "hide" : ""}`} >
                        <AiOutlineSearch /> Filter cards</button>
                </div>
                {toggleShow && <div className='menu-content-wrapper'>
                    <span style={{ top: '7px' }} onClick={() => setToggleShow(!toggleShow)} className="modal-close-btn">
                        <IoMdClose size={25} />
                    </span>
                    <RobotFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} user={user} />
                </div>}
            </div>
            {robots?.length > 0 && <RobotList robots={robots} />}
        </section >
    )
}