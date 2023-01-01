import React from 'react'
import { RobotPreview } from './robot-preview'

export const RobotList = ({ robots, onAddToCart, onRemoveCart, onLoadRobots, onToggleCard,onToggleFilter }) => {
    return (
        <ul className="clean-list robot-list ">
            {robots.map(robot =>
                <li key={robot._id}>
                    <RobotPreview
                        robot={robot}
                        addToCart={onAddToCart}
                        removeCart={onRemoveCart}
                        onLoadRobots={onLoadRobots}
                        onToggleCard={onToggleCard}
                        onToggleFilter={onToggleFilter}
                    />
                </li>)}
        </ul>
    )
}