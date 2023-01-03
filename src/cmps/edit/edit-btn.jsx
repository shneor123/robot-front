import React from 'react'
import { useSelector } from 'react-redux';
import { AiOutlineCreditCard, AiOutlineShoppingCart } from "react-icons/ai";
import { BsPencil } from "react-icons/bs";
import { MdDeleteOutline } from "react-icons/md"
import { useTranslation } from 'react-i18next';

export const EditBtn = ({ onOpenTaskDetails, deleteRobot, onOpenCardEdit, onToggleCard, onToggleFilter }) => {
  const { user } = useSelector(stateModule => stateModule.userModule)
  const { t } = useTranslation()
  
  return (
    <div className="edit-btn2">
      <span className="quick-card-editor-buttons-item" onClick={onOpenTaskDetails}><AiOutlineCreditCard /> {t("edit_btn_card")}</span>
      <span className="quick-card-editor-buttons-item" onClick={onToggleCard}><AiOutlineShoppingCart /> {t("edit_btn_cart")}</span>
      <span className="quick-card-editor-buttons-item" onClick={onToggleFilter}><AiOutlineShoppingCart /> {t("edit_btn_filter")}</span>
      {user && user.isAdmin && <>
        <span className="quick-card-editor-buttons-item" onClick={onOpenCardEdit}><BsPencil /> {t("edit_btn_edit")}</span>
        <span className="quick-card-editor-buttons-item" onClick={deleteRobot}><MdDeleteOutline /> {t("edit_btn_fdelete")}</span>
      </>}
    </div>
  )
}