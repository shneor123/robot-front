import { RobotPreview } from './RobotPreview'

export const RobotList = ({ robots, onAddToCart, onRemoveCart }) => {

    return (
        <ul className="robot-list clean-list">
            {robots.map(robot =>
                <li key={robot._id}>
                    <RobotPreview
                        robot={robot}
                        onAddToCart={onAddToCart}
                        onRemoveCart={onRemoveCart}

                    />
                </li>)}
        </ul>
    )
}