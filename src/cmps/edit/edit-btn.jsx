import React from 'react'
import { AiOutlineCreditCard } from "react-icons/ai";
import { BsPencil } from "react-icons/bs";
import { MdDeleteOutline } from "react-icons/md"

export const EditBtn = ({ onOpenTaskDetails, deleteRobot, onOpenCardEdit }) => {
  return (
    <div className="edit-btn">
      <span className="quick-card-editor-buttons-item" onClick={onOpenTaskDetails}><AiOutlineCreditCard /> Open card</span>
      <span className="quick-card-editor-buttons-item" onClick={onOpenCardEdit}><BsPencil />  Edit robot</span>
      <span className="quick-card-editor-buttons-item" onClick={deleteRobot}><MdDeleteOutline /> Delete Robot</span>
    </div>
  )
}
