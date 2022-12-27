import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useNavigate, useParams } from 'react-router-dom'
import { userService } from '../../services/user.service'
import { login, updateUser } from '../../store/actions/user.action'

export const UserEdit = () => {

    const params = useParams()
    const loggedInUser = useSelector(storeState => storeState.userModule.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [isPassword, setIsPassword] = useState(false)
    const [currPassword, setCurrPassword] = useState('')
    const [isWrongPassword, setIsWrongPassword] = useState(false)
    const [isWrongNewPassword, setIsWrongNewPassword] = useState(false)
    const [updatedUser, setUpdatedUser] = useState({ fullname: '', password1: '', password2: '' })

    useEffect(() => {
        (async function () {
            const user = await userService.getById(params.id)
            setUpdatedUser({ ...updatedUser, _id: params.id, username: user.username, fullname: user.fullname })
        })()
    }, [params])

    const onInputChange = ({ target: { name, value, checked } }) => {
        if (name === 'isPassword') return setIsPassword(checked)
        if (name === 'currPassword') return setCurrPassword(value)
        setUpdatedUser({ ...updatedUser, [name]: value })
    }

    const onSubmit = async (ev) => {
        ev.preventDefault()

        const user = {
            _id: updatedUser._id,
            username: updatedUser.username,
            password: currPassword,
            fullname: updatedUser.fullname
        }

        if (isPassword) {
            const { password1, password2 } = updatedUser
            if (password1 !== password2) {
                setUpdatedUser({ ...updatedUser, password1: '', password2: '' })
                setIsWrongNewPassword(true)
                return
            }
            user.newPassword = updatedUser.password1
        }

        try {
            const savedUser = await userService.update(user)
            dispatch(updateUser(savedUser, false, false))
            /* if user updated his own details (not admin) we need to login again to update local storage and cookie */
            if (!loggedInUser.isAdmin) {
                dispatch(login({ username: user.username, password: user.newPassword || user.password }, true, true))
            }
        } catch (err) {
            if (err.status === 401) return setIsWrongPassword(true)
            if (err.status === 403) {
                dispatch(({ type: 'SET_USER_MSG', msg: { type: 'danger', msg: 'You\'ve tried update another user. You have been logged!' } }))
                navigate('/robots')
                return
            }
            setIsWrongPassword(false)
            console.log('err', err)
            return
        }
        setTimeout(() => {
            navigate(`/users/${user._id}`)
        }, 1000);
    }

    const { t } = useTranslation()

    return (
        <section className="user-edit main-layout">
            <h2 className='page-header'>{t("user_edit_header")}</h2>
            <Link className='back-btn' to={'/users'}>{t("details_back")}</Link>
            <form onSubmit={onSubmit}>
                <ul className='clean-list'>
                    <li>
                        <label htmlFor="curr-password">{t("user_edit_current")} </label>
                        <input type="password"
                            name="currPassword"
                            id="curr-password"
                            autoComplete='new-password'
                            value={currPassword}
                            onChange={onInputChange}
                            required />
                        {isWrongPassword && <span className='error-msg'>{t("user_edit_wrong")}</span>}
                    </li>
                    <li className='clean-list'>
                        <label htmlFor="fullname">{t("user_edit_name")} </label>
                        <input type="text"
                            name="fullname"
                            id="fullname"
                            value={updatedUser.fullname}
                            onChange={onInputChange}
                            required />
                    </li>

                    <input type="checkbox" name="isPassword" id="change-password" checked={isPassword} onChange={onInputChange} />
                    <label htmlFor="change-password">{t("user_edit_change")}</label>
                    <fieldset disabled={!isPassword}>
                        <li className='clean-list'>
                            <label htmlFor="password1">{t("user_edit_new")} </label>
                            <input type="password"
                                name="password1"
                                id="password1"
                                value={updatedUser.password1}
                                onChange={onInputChange}
                                minLength={3}
                                required />
                        </li>
                        <li className='clean-list'>
                            <label htmlFor="password2">{t("user_edit_verify")} </label>
                            <input type="password"
                                name="password2"
                                id="password2"
                                value={updatedUser.password2}
                                onChange={onInputChange}
                                minLength={3}
                                required />
                        </li>
                        {isWrongNewPassword && <p className='error-msg'>{t("user_edit_no_match")}</p>}
                    </fieldset>
                </ul>
                <button className='main-btn'>{t("user_edit_save")}</button>
            </form>
        </section>
    )
}