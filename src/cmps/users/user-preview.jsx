import React from 'react'
import { UserImg } from '../general/user-img'
import { NavLink } from 'react-router-dom'
import { utilService } from '../../services/basic/util.service'
import adminImg from '../../assets/img/admin.png'
import { useTranslation } from 'react-i18next'

export const UserPreview = ({ user, onToggleAdmin, onDeleteUser, openQuestionModal }) => {

    const { t } = useTranslation()

    

    const onAdminClick = (userId, isAdmin, fullname) => {
        const question = isAdmin ?
            `${t("users_question_admin")} ${fullname}?` :
            `${t("users_question_admin_2")} ${fullname} ${t("users_question_admin_2_2")}?`

        openQuestionModal(question, [t("users_users_question_no"), t("users_users_question_yes")], [null, () => onToggleAdmin(userId, isAdmin)])
    }

    const onDeleteClick = (userId, fullname) => {
        const question = `${t("users_question")} ${fullname}?`
        openQuestionModal(question, [t("users_users_question_no"), t("users_users_question_yes")], [null, () => onDeleteUser(userId)])
    }

    return (
        <li className="user-preview">
            <section className='details'>
                <UserImg user={user} />
                {user.isAdmin && <img className="admin-img" src={adminImg} alt="admin" />}
                <p>{user.fullname}</p>
            </section>
            <section className='buttons'>
                <NavLink className='sub-btn center-text' to={`/users/${user._id}`}>{t("users_details")}</NavLink>
                <NavLink className='sub-btn center-text' to={`/users/edit/${user._id}`}>{t("users_edit")}</NavLink>
                <button className='sub-btn center-text' onClick={() => onAdminClick(user._id, user.isAdmin, user.fullname)}>
                    {user.isAdmin ? t("users_edit_admin_remove") : t("users_edit_admin_set")}
                </button>
                <button className='sub-btn center-text' onClick={() => onDeleteClick(user._id, user.fullname)}>{t("users_delete")}</button>
            </section>
            <p className='modified-member'><strong>{t("users_since")} </strong>{utilService.dueDateFormat(user.createdAt)}</p>
            {user.lastModified ?
                <p className='modified-member'><strong>{t("users_modified")} </strong>{utilService.dueDateFormat(user.lastModified)}</p>
                : <p className='modified-member' ><strong>{t("users_modified")}</strong> {"-no-conect-acoount"}</p>
            }
        </li>
    )
}