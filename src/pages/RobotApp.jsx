import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AiOutlineSearch } from "react-icons/ai"
import { IoMdClose } from "react-icons/io";

import { Loader } from '../cmps/general/loader'
import { RobotFilter } from '../cmps/RobotFilter'
import { RobotList } from '../cmps/RobotList'
import { loadRobots } from '../store/actions/robot.action'
import { loadUsers } from '../store/actions/user.action'
import { socketService } from '../services/socket.service';

export const RobotApp = () => {
    const { robots, filterBy } = useSelector(storeState => storeState.robotModule)
    const { user } = useSelector(storeState => storeState.userModule)
    const [toggleShow, setToggleShow] = useState(false)
    const dispatch = useDispatch()


    useEffect(() => {
        setSocket()
        onLoadRobot()
        socketService.off('update-robot',)
        socketService.on('update-robot', async (robotFromSocket) => {
            onLoadRobot(robotFromSocket._id)
        })
    }, [])

    const setSocket = () => {
        try {
            socketService.emit('join-robot');
        } catch (err) {
            console.log('Cannot load board', err)
        }

    }

    const onLoadUsers = () => {
        dispatch(loadUsers())
    }

    const onLoadRobot = () => {
        dispatch(loadRobots())
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
                        className={`btn-opt ${toggleShow ? "hide" : ""}`}
                    >

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
            {/* {robots?.length > 0 && < Cart />} */}
        </section >
    )
}