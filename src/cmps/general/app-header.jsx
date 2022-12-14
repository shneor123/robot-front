import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import logoImg from '../../assets/img/logo.png'
import { logout } from '../../store/actions/user.action';
import { UserImg } from './user-img';

export const AppHeader = () => {
    const { user } = useSelector(stateModule => stateModule.userModule)
    const { robots } = useSelector(stateModule => stateModule.robotModule)
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const { pathname } = useLocation()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const onUserLogout = () => {
        dispatch(logout())
        setIsMenuOpen(false)
        navigate('/login')
    }

    const handleKeyEvent = (ev) => {
        if (ev) ev.preventDefault()
        if (ev.key === "Escape") setIsMenuOpen(false)
    }
    return (
        <section className="app-header-secend"
            tabIndex={"0"}
            onKeyDown={handleKeyEvent}>
            <section className="app-header">
                <main className="main-layout">
                    <Link to={"/"} className="logo">
                        <img src={logoImg} alt="Robo Store logo" />
                        <h2>Robo Store</h2>
                    </Link>
                    <section className='header-navbar'>
                        <nav className='full-screen-nav'>
                            <NavLink to="/"> Home </NavLink>
                            <NavLink to="/robots"> Robots </NavLink>
                            {user?.isAdmin && <NavLink to="/users"> Users </NavLink>}
                            <NavLink to="/dashboard"> Dashboard </NavLink>
                            <NavLink to="/about"> About </NavLink>
                        </nav>
                        <div className='hamburger-menu'>
                            <div className='menu-btn'>
                                <div className='hamburger-btn' onClick={() => setIsMenuOpen(!isMenuOpen)}>☰</div>
                                <UserImg user={user} linkOnAvatar={'/login'} clickEv={() => { if (user) setIsMenuOpen(!isMenuOpen) }} />
                            </div>

                            {isMenuOpen &&
                                <main>
                                    {user && <header className='container'><UserImg user={user} /> <h1>Hi {user.fullname}</h1></header>}
                                    <nav className='hamburger-nav'>
                                        {user && <NavLink to={`/users/${user._id}`} onClick={() => setIsMenuOpen(false)}>My Profile</NavLink>}
                                        {!user && <NavLink to="/login" onClick={() => setIsMenuOpen(false)}>Login</NavLink>}
                                        <NavLink to="/" className="small-screen-nav-item" onClick={() => setIsMenuOpen(false)}>Home</NavLink>
                                        <NavLink to="/robots" className="small-screen-nav-item" onClick={() => setIsMenuOpen(false)}>Robots</NavLink>
                                        {user?.isAdmin && <NavLink to="/users" className="small-screen-nav-item" onClick={() => setIsMenuOpen(false)}>Users</NavLink>}
                                        <NavLink to="/dashboard" className="small-screen-nav-item" onClick={() => setIsMenuOpen(false)}>Dashboard</NavLink>
                                        <NavLink to="/about" className="small-screen-nav-item" onClick={() => setIsMenuOpen(false)}>About</NavLink>
                                    </nav>
                                    {user && <button className="logout-btn" onClick={() => onUserLogout()}>Logout</button>}
                                </main>}
                        </div>
                    </section>
                </main>
            </section >
            <div className="header-titles-container">
                <div className="header-inf">
                    {pathname !== '/robots' && pathname !== '/users' ? <h3></h3> : <h3>Robots: {robots.length}</h3>}
                </div>
            </div>
        </section >
    )
}


// const handleKeyEvent = (e) => {
//     if (e.key === "Escape") navigate(-1);
//   };

//   const onSaveTask = (ev = null) => {
//     if (ev) ev.preventDefault();
//     task.title = fields.title
//     dispatch(saveTask(task, boardId, groupId));
//   };

//   if (task) {
//     return (
//       <section
        // tabIndex={"0"}
        // onKeyDown={handleKeyEvent}