import { RobotPreview } from './RobotPreview'

export const RobotList = ({ robots }) => {

    return (
        <ul className="clean-list robot-list ">
            {robots.map(robot =>
                <li key={robot._id}>
                    <RobotPreview robot={robot} />
                </li>)}
        </ul>
    )
}