import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { PageBar } from '../cmps/PageBar'
import { RobotFilter } from '../cmps/RobotFilter'
import { RobotList } from '../cmps/RobotList'

import { loadRobots } from '../store/actions/robot.action'

export const RobotApp = () => {

    const { robots, filterBy } = useSelector(storeState => storeState.robotModule)
    const user = useSelector(storeState => storeState.userModule.user)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(loadRobots())
    }, [])

    const onSetFilterBy = (currFilterBy) => {
        dispatch(loadRobots(currFilterBy))
    }

    return <section className="robot-app main-layout">
        <RobotFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} />
        <div className='page-bar-container'>
            <PageBar filterBy={filterBy} onSetFilterBy={onSetFilterBy} />
            {user && <Link className='add-robot-btn main-btn center-text' to='/robots/edit'>Add new Robot</Link>}
        </div>
        {robots?.length > 0 && <RobotList robots={robots} />}
    </section>
}