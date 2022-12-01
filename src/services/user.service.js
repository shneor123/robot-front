import { httpService } from './http.service'
import { storageService } from './async-storage.service'

const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'
const AUTH_ENDPOINT = `auth`

/* FIX - remove socket service if no need */

export const userService = {
    getUsers,
    getLoggedinUser,
    login,
    signup,
    logout,
    getById,
    update,
    remove
}


function getUsers() {
    return storageService.query('user')
}

async function getById(userId) {
    const user = await storageService.get('user', userId)
    return user;
}

function remove(userId) {
    return storageService.remove('user', userId)
}

async function update(user) {
    await storageService.put('user', user)
    if (getLoggedinUser()._id === user._id) saveLocalUser(user)
    return user;
}

async function login(userCred) {
    const user = await storageService.post('user', userCred)
    if (user) {
        return saveLocalUser(user)
    }
}

async function signup(userCred) {
    const user = await storageService.post('user', userCred)
    return saveLocalUser(user)
}

async function logout() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
    return await storageService.post('user')
}

function saveLocalUser(user) {
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    return user
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER) || 'null')
}

// function _rememberUser(user, isRemember) {
//     if (user) {
//         sessionStorage.setItem(STORAGE_KEY_LOGIN, JSON.stringify(user))
//         if (isRemember) localStorage.setItem(STORAGE_KEY_LOGIN, JSON.stringify(user))
//     }
// }