import chatColor from '../assets/img/chat-color.png'
import chatBW from '../assets/img/chat-black-and-white.png'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
    socketService, SOCKET_EMIT_SET_ROOM,
    SOCKET_EVENT_ADD_MSG, SOCKET_EMIT_SEND_MSG,
    SOCKET_EVENT_USER_IS_TYPING, SOCKET_EMIT_USER_IS_TYPING,
    SOCKET_EVENT_USER_COUNT, SOCKET_EMIT_USER_COUNT
} from '../services/socket.service'

export const ChatRoom = ({ loggedInUser, chat, chatRoomId, chatTitle }) => {

    const [isOpenMode, setIsOpenMode] = useState(false)
    const [isUnreadMsg, setIsUnreadMsg] = useState(true)
    const [userTypeFullname, setUserTypeFullname] = useState('')
    const [msg, setMsg] = useState('')
    const [msgs, setMsgs] = useState(chat? [...chat] : [])
    const typingTimeoutId = useRef()
    const [connectedUsers, setConnectedUsers] = useState(1)

    useEffect(() => {
        socketService.emit(SOCKET_EMIT_SET_ROOM, chatRoomId)
        socketService.on(SOCKET_EVENT_USER_COUNT, userCount)
        socketService.on(SOCKET_EVENT_USER_IS_TYPING, userIsTyping)
        socketService.on(SOCKET_EVENT_ADD_MSG, addMsg)
        return () => {
            socketService.emit(SOCKET_EMIT_SET_ROOM, null)
            socketService.off(SOCKET_EVENT_USER_COUNT, userCount)
            socketService.off(SOCKET_EVENT_USER_IS_TYPING, userIsTyping)
            socketService.off(SOCKET_EVENT_ADD_MSG, addMsg)
        }
    }, [])

    const onToggleChatMode = (ev) => {
        ev.stopPropagation()
        setIsOpenMode(!isOpenMode)
        setIsUnreadMsg(false)
    }

    const addMsg = (newMsg) => {
        setMsgs(prevMsgs => [...prevMsgs, newMsg])
        setIsUnreadMsg(true) //if the chat is open, it will return false when we close it
    }

    const userIsTyping = (fullname) => {
        if (typingTimeoutId.current) clearTimeout(typingTimeoutId.current)

        setUserTypeFullname(fullname)

        typingTimeoutId.current = setTimeout(() => {
            setUserTypeFullname('')
        }, 500)
    }

    const userCount = (count) => {
        setConnectedUsers(count)
    }

    const onChangeInput = ({ target: { value } }) => {
        setMsg(value)
        if (value) socketService.emit(SOCKET_EMIT_USER_IS_TYPING, loggedInUser?.fullname || 'Guest')
    }

    const onSendMsg = (ev) => {
        ev.preventDefault()
        if (!msg) return

        const newMsg = { txt: msg }
        if (loggedInUser) newMsg.user = { _id: loggedInUser._id, fullname: loggedInUser.fullname }
        socketService.emit(SOCKET_EMIT_SEND_MSG, newMsg)
        setMsg('')
    }


    return <section className={`chat-room ${isOpenMode ? 'open' : 'close'}`}>
        <img className='chat-close' src={isUnreadMsg ? chatColor : chatBW} alt="chat" onClick={onToggleChatMode} />

        {isOpenMode && <section className='chat-open'>
            <header>
                <div className="title">
                    <h2>{chatTitle}</h2>
                    {!userTypeFullname && <p className='user-counter'>{connectedUsers === 1 ? 'You are the only one connected' : `${connectedUsers} users are connected`}</p>}
                    {userTypeFullname && <p className="typing-msg">{userTypeFullname} is typing...</p>}
                </div>
                <button type="button" className='close-btn' onClick={onToggleChatMode}>X</button>
            </header>

            <ul className="main-chat clean-list">
                {msgs.map((msg, idx) => <li key={idx}>
                    {msg.user && <Link className='msg-name' to={`/users/${msg.user._id}`}>
                        {msg.user._id === loggedInUser?._id ? 'Me' : msg.user.fullname}:
                    </Link>}
                    
                    {!msg.user && <span className='msg-name'>Guest:</span>}
                    
                    <span className='msg-txt'> {msg.txt}</span>
                </li>)}
            </ul>

            <form onSubmit={onSendMsg} className='msg-form'>
                <input type="text" className='chat-msg' value={msg} onChange={onChangeInput} />
                <button className='main-btn'>Send</button>
            </form>
        </section>}
    </section>
}