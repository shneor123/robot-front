import io from 'socket.io-client'

export const SOCKET_EMIT_SET_ROOM = 'chat-set-room'
export const SOCKET_EVENT_ADD_MSG = 'chat-add-msg'
export const SOCKET_EMIT_SEND_MSG = 'chat-send-msg'
export const SOCKET_EVENT_USER_IS_TYPING = 'chat-subscribe-typing'
export const SOCKET_EMIT_USER_IS_TYPING = 'chat-fire-typing'
export const SOCKET_EVENT_USER_COUNT = 'chat-subscribe-user-count'
export const SOCKET_EMIT_USER_COUNT = 'chat-fire-user-count'

const BASE_URL = (process.env.NODE_ENV === 'production') ? '' : '//localhost:3030'

export const socketService = _createSocketService()

// for debugging from console
// window.socketService = socketService

socketService.setup()

function _createSocketService() {
    let socket = null
    const socketService = {
        setup() {
            socket = io(BASE_URL)
        },
        on(eventName, cb) {
            socket.on(eventName, cb)
        },
        off(eventName, cb = null) {
            if (!socket) return
            if (!cb) socket.removeAllListeners(eventName)
            else socket.off(eventName, cb)
        },
        emit(eventName, data) {
            socket.emit(eventName, data)
        },
        terminate() {
            socket = null
        },
    }
    return socketService
}