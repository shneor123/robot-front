import { userService } from '../../services/user.service'


export function loadUsers() {
    return async dispatch => {
        try {
            const users = await userService.getUsers()
            dispatch({ type: 'SET_USERS', users: users })
        } catch (err) {
            console.error('Error on loading users', err)
            dispatch(({ type: 'SET_USER_MSG', msg: { type: 'danger', msg: 'Failed loading users' } }))
        }
    }
}
export function removeUser(userId) {
    return async dispatch => {
        try {
            await userService.remove(userId)
            dispatch({ type: 'REMOVE_USER', userId })
            dispatch(({ type: 'SET_USER_MSG', msg: { type: 'success', msg: 'User removed successfully' } }))
            console.log('user removed successfully');
        } catch (err) {
            console.log('User Actions: err in removeUser', err)
            dispatch(({ type: 'SET_USER_MSG', msg: { type: 'danger', msg: 'Failed removing user' } }))
        }
    }
}
export function login(credentials) {
    return async (dispatch) => {
        try {
            const user = await userService.login(credentials)
            dispatch({type: 'SET_USER',user})
        } catch (err) {
            dispatch(({ type: 'SET_USER_MSG', msg: { type: 'danger', msg: 'Failed signup. Please try again later' } }))
            console.log('Cannot login', err)
        }
    }
}
export function signup(credentials) {
    return async (dispatch) => {
        try {
            const user = await userService.signup(credentials)
            dispatch({type: 'SET_USER',user})
        } catch (err) {
            dispatch(({ type: 'SET_USER_MSG', msg: { type: 'danger', msg: 'Failed signup. Please try again later' } }))
            console.log('Cannot signup', err)
        }

    }
}
export function logout() {
    return async (dispatch) => {
        try {
            await userService.logout()
            dispatch({ type: 'SET_USER',user: null})
        } catch (err) {
            dispatch(({ type: 'SET_USER_MSG', msg: { type: 'danger', msg: 'Failed logout. Please try again later' } }))
            console.log('Cannot logout', err)
        }
    }
}
export function setUserMsg(msg) {
    return dispatch => {
        dispatch({ type: 'SET_USER_MSG', msg })
    }
}
