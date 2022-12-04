import { RobotPreview } from './RobotPreview'

export const RobotList = ({ robots }) => {

    return (
        <ul className="robot-list clean-list">
            {robots && robots.map(robot =>
                <li key={robot._id}>
                    <RobotPreview robot={robot} />
                </li>)}
        </ul>
    )
}