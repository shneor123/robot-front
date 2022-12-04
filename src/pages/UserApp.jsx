import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { QuestionModal } from '../cmps/general/QuestionModal'
import { UserList } from '../cmps/users/UserList'
import { loadUsers, removeUser, updateUser } from '../store/actions/user.action'

export const UserApp = () => {

    const dispatch = useDispatch()
    const users = useSelector(storeState => storeState.userModule.users)
    const [questionModalOptions, setQuestionModalOptions] = useState(null)

    useEffect(() => {
        dispatch(loadUsers())
    }, [])

    const onToggleAdmin = (userId, isAdmin) => {
        const user = { _id: userId, isAdmin: !isAdmin }
        dispatch(updateUser(user, true, true))
    }

    const onDeleteUser = (userId) => {
        dispatch(removeUser(userId))
    }

    const openQuestionModal = (question, answers, cbFuncs) => {
        setQuestionModalOptions({ question, answers, cbFuncs })
    }

    if (!users) return 'Loading...'

    return (
        <section className="user-app main-layout">
            <h2 className='page-header'>Users</h2>
            <UserList users={users} onToggleAdmin={onToggleAdmin} onDeleteUser={onDeleteUser} openQuestionModal={openQuestionModal} />
            {questionModalOptions && <QuestionModal {...questionModalOptions} setModalFunc={setQuestionModalOptions} />}
        </section>
    )
}