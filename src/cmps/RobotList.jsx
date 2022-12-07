import { useLocation } from 'react-router-dom'
import { RobotPreview } from './RobotPreview'

export const RobotList = ({ robots }) => {
    const pathname = useLocation()

    return (

        <ul className="clean-list robot-list ">
        {/* <ul className={`${pathname === '/robots' ? 'robot-list-2 clean-list' : 'robot-list clean-list'}`}> */}
            {robots.map(robot =>
                <li key={robot._id}>
                    <RobotPreview robot={robot} />
                </li>)}
        </ul>
    )
}