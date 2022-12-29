import React from 'react'
import { AiOutlineCreditCard, AiOutlineShoppingCart } from "react-icons/ai";
import { BsPencil } from "react-icons/bs";
import { MdDeleteOutline } from "react-icons/md"
import { useSelector } from 'react-redux';

export const EditBtn = ({ onOpenTaskDetails, deleteRobot, onOpenCardEdit ,onToggleCard}) => {
  const { user } = useSelector(stateModule => stateModule.userModule)

  return (
    <div className="edit-btn2">
      <span className="quick-card-editor-buttons-item" onClick={onOpenTaskDetails}><AiOutlineCreditCard /> Open card</span>
      <span className="quick-card-editor-buttons-item" onClick={onToggleCard}><AiOutlineShoppingCart /> Open cart</span>
      {user.isAdmin && <>
        <span className="quick-card-editor-buttons-item" onClick={onOpenCardEdit}><BsPencil />  Edit robot</span>
        <span className="quick-card-editor-buttons-item" onClick={deleteRobot}><MdDeleteOutline /> Delete Robot</span>
      </>}
    </div>
  )
}
