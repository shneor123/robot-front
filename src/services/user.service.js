import { httpService } from './http.service'

const AUTH_BASE_PATH = 'auth/'
const USER_BASE_PATH = 'user/'
const STORAGE_KEY_LOGIN = 'robots_loggedInUser'

/* FIX - remove socket service if no need */

export const userService = {
    getLoggedInUser,
    login,
    signup,
    logout,
    query,
    getById,
    update,
    remove
}

function getLoggedInUser() {
    let user = JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGIN))
    if (!user) {
        user = JSON.parse(localStorage.getItem(STORAGE_KEY_LOGIN)) //in case the user checked 'remember me'
        if (user) _rememberUser(user, false)
    }
    return user
}

async function login(credentials, isRemember) {
    try {
        const user = await httpService.post(AUTH_BASE_PATH + 'login', credentials)
        // socketService.login(user._id)
        if (user) _rememberUser(user, isRemember)
        return user
    } catch (err) {
        throw err
    }
}

async function signup(userInfo, isRemember) {
    const user = await httpService.post(AUTH_BASE_PATH + 'signup', userInfo)
    // socketService.signup(user._id)
    _rememberUser(user, isRemember)
    return user
}

async function logout() {
    localStorage.removeItem(STORAGE_KEY_LOGIN)
    sessionStorage.removeItem(STORAGE_KEY_LOGIN)
    // socketService.logout()
    return await httpService.post(AUTH_BASE_PATH + 'logout')
}

async function query() {
    const users = await httpService.get(USER_BASE_PATH)
    return users
}

async function getById(userId) {
    const user = await httpService.get(USER_BASE_PATH + userId)
    return user
}

async function update(user, isSetAdmin) {
    try {
        let savedUser

        if (isSetAdmin) savedUser = await httpService.put(USER_BASE_PATH + 'admin', user)
        else savedUser = await httpService.put(USER_BASE_PATH, user)

        return savedUser
    } catch (err) {
        const { status, data } = err.response
        if (status === 401 || status === 403) throw ({ status, data })
        throw err
    }
}

async function remove(userId) {
    return await httpService.delete(USER_BASE_PATH + userId)
}

function _rememberUser(user, isRemember) {
    if (user) {
        sessionStorage.setItem(STORAGE_KEY_LOGIN, JSON.stringify(user))
        if (isRemember) localStorage.setItem(STORAGE_KEY_LOGIN, JSON.stringify(user))
    }
}