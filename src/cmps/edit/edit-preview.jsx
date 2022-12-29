import React from 'react'
import { EditBtn } from './edit-btn'

export const EditPreview = ({ onOpenTaskDetails, onDeleteRobot, closeQuickEdit ,onOpenCardEdit}) => {
    return (
        <>
            <div className="edit-preview-container">
                <EditBtn
                    onOpenTaskDetails={onOpenTaskDetails}
                    deleteRobot={onDeleteRobot}
                    closeQuickEdit={closeQuickEdit}
                    onOpenCardEdit={onOpenCardEdit}
                />
            </div>
            <div className="edit-preview" onClick={closeQuickEdit}></div>
        </>
    )
}
