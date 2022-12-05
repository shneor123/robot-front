import Avatar from '@mui/material/Avatar';
import { Link } from 'react-router-dom';

export const UserImg = ({ user, linkOnAvatar, clickEv }) => {

    const getUsernameLetter = (name) => {
        return name?.charAt(0).toUpperCase()
    }

    return (
        <span className="user-img center-text" onClick={clickEv}>
            {user && <>{getUsernameLetter(user.fullname)}</>}
            {!user && <Link to={linkOnAvatar || ''}><Avatar /></Link>}
        </span>
    )
}