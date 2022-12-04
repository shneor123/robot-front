import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setUserMsg } from '../../store/actions/user.action'

export const UserMsg = () => {
    const dispatch = useDispatch()
    const userMsg = useSelector(storeState => storeState.userModule.msg)
    const timeoutId = useRef()

    useEffect(() => {
        if (timeoutId.current) clearTimeout(timeoutId.current)

        timeoutId.current = setTimeout(() => {
            onCloseMsg()
        }, 5000)

        return () => {
            clearTimeout(timeoutId.current)
        }
    }, [userMsg])

    const onCloseMsg = () => {
        clearTimeout(timeoutId.current)
        dispatch(setUserMsg(null))
    }

    if (!userMsg) return <section className="user-msg"></section>

    return <section className={`user-msg open ${userMsg.type}`}>
        <p>{userMsg.msg}</p>
        <button className='close-btn' onClick={(ev) => { ev.stopPropagation(); onCloseMsg() }}>X</button>
    </section >
}