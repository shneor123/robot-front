import { userService } from '../../services/user.service'

const initialState = {
    users: null,
    user: userService.getLoggedinUser(),
    msg: null //{type: '', msg: ''}
}

export function userReducer(state = initialState, action) {
    let users
    switch (action.type) {
        case 'SET_USERS':
            return { ...state, users: action.users }
        case 'SET_USER':
            return { ...state, user: action.user }
        case 'UPDATE_USER':
            users = state.users.map(user => user._id === action.user._id ? action.user : user)
            return { ...state, users }
        case 'UPDATE_USER_ADMIN':
            users = state.users.map(user => user._id === action.user._id ? { ...user, isAdmin: action.user.isAdmin } : user)
            return { ...state, users }
        case 'REMOVE_USER':
            users = state.users.filter(user => user._id !== action.userId)
            return { ...state, users }
        case 'SET_USER_MSG':
            return { ...state, msg: action.msg }
        default:
            return state
    }
}