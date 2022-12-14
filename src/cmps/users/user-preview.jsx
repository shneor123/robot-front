import React from 'react'
import { UserImg } from '../general/user-img'
import { NavLink } from 'react-router-dom'
import { utilService } from '../../services/util.service'
import adminImg from '../../assets/img/admin.png'

export const UserPreview = ({ user, onToggleAdmin, onDeleteUser, openQuestionModal }) => {

    const onAdminClick = (userId, isAdmin, fullname) => {
        const question = isAdmin ?
            `Are you sure you want to remove admin authorizations from ${fullname}?` :
            `Are you sure you want to set ${fullname} as admin?`

        openQuestionModal(question, ['Cancel', 'OK'], [null, () => onToggleAdmin(userId, isAdmin)])
    }

    const onDeleteClick = (userId, fullname) => {
        const question = `Are you sure you want to remove ${fullname}?`
        openQuestionModal(question, ['Cancel', 'OK'], [null, () => onDeleteUser(userId)])
    }

    return (
        <li className="user-preview">
            <section className='details'>
                <UserImg user={user} />
                {user.isAdmin && <img className="admin-img" src={adminImg} alt="admin" />}
                <p>{user.fullname}</p>
            </section>
            <section className='buttons'>
                <NavLink className='sub-btn center-text' to={`/users/${user._id}`}>Details</NavLink>
                <NavLink className='sub-btn center-text' to={`/users/edit/${user._id}`}>Edit</NavLink>
                <button className='sub-btn center-text' onClick={() => onAdminClick(user._id, user.isAdmin, user.fullname)}>
                    {user.isAdmin ? 'Remove admin' : 'Set admin'}
                </button>
                <button className='sub-btn center-text' onClick={() => onDeleteClick(user._id, user.fullname)}>Delete</button>
            </section>
            <p className='modified-member'><strong>Member Since: </strong>{utilService.dueDateFormat(user.createdAt)}</p>
            {user.lastModified ?
                <p className='modified-member'><strong>Last Modified: </strong>{utilService.dueDateFormat(user.lastModified)}</p>
                : <p className='modified-member' ><strong>Last Modified:</strong> {"-no-conect-acoount"}</p>
            }
        </li>
    )
}