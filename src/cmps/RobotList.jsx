import { RobotPreview } from './RobotPreview'

export const RobotList = ({ robots ,onAddToCart}) => {

    return (
        <ul className="robot-list clean-list">
            {robots.map(robot =>
                <li key={robot._id}>
                    <RobotPreview
                        robot={robot}
                        onAddToCart={onAddToCart}

                    />
                </li>)}
        </ul>
    )
}