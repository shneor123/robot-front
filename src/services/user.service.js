import { httpService } from './http.service'

const AUTH_BASE_PATH = `auth/`
const USER_BASE_PATH = `user/`
const STORAGE_KEY_LOGIN = 'robots_loggedInUser'


export const userService = {
    login,
    signup,
    logout,
    getUsers,
    getById,
    update,
    remove,
    getLoggedInUser,
}

async function login(credentials, isRemember) {
    try {
        const user = await httpService.post(`${AUTH_BASE_PATH}/login`, credentials)
        if (user) _rememberUser(user, isRemember)
        return user
    } catch (err) {
        throw err
    }
}

async function signup(userInfo, isRemember) {
    const user = await httpService.post(`${AUTH_BASE_PATH}/signup`, userInfo)
    _rememberUser(user, isRemember)
    return user
}

async function logout() {
    localStorage.removeItem(STORAGE_KEY_LOGIN)
    sessionStorage.removeItem(STORAGE_KEY_LOGIN)
    return await httpService.post(`${AUTH_BASE_PATH}/logout`)
}

async function getUsers() {
    const usersFromDb = await httpService.get(USER_BASE_PATH)
    return usersFromDb
}

async function getById(userId) {
    const user = await httpService.get(`${USER_BASE_PATH}/${userId}`)
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
    return await httpService.delete(`${USER_BASE_PATH}/${userId}`)
}

function getLoggedInUser() {
    let user = JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGIN))
    if (!user) {
        user = JSON.parse(localStorage.getItem(STORAGE_KEY_LOGIN)) //in case the user checked 'remember me'
        if (user) _rememberUser(user, false)
    }
    return user
}

function _rememberUser(user, isRemember) {
    if (user) {
        sessionStorage.setItem(STORAGE_KEY_LOGIN, JSON.stringify(user))
        if (isRemember) localStorage.setItem(STORAGE_KEY_LOGIN, JSON.stringify(user))
    }
}