import { userService } from '../../services/user.service'

const guestUser = {
    _id: '1',
    fullname: 'Guest',
    username: 'guest@gmail.com',
    imgURL: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
}

const initialState = {
    users: null,
    user: userService.getLoggedInUser(),
    msg: null //{type: '', msg: ''}
}

export function userReducer(state = initialState, action) {
    let users
    switch (action.type) {
        case 'SET_USERS':
            return { ...state, users: action.users }

        case 'SET_USER':
            return { ...state, user: action.user ? action.user : guestUser }


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