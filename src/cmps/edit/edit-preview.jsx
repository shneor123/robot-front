import React from 'react'
import { EditBtn } from './edit-btn'

export const EditPreview = ({ robot, onDeleteRobot, onOpenTaskDetails, onOpenCardEdit, onCloseQuickEdit ,onToggleCard,onToggleFilter}) => {
    return (
        <>
            <div className="edit-preview-container">
                <EditBtn
                    robot={robot}
                    deleteRobot={onDeleteRobot}
                    onOpenTaskDetails={onOpenTaskDetails}
                    onOpenCardEdit={onOpenCardEdit}
                    onCloseQuickEdit={onCloseQuickEdit}
                    onToggleCard={onToggleCard}
                    onToggleFilter={onToggleFilter}
                />
            </div>
            <div className="edit-preview" onClick={onCloseQuickEdit}></div>
        </>
    )
}
