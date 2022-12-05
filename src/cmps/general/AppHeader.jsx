import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom'

import { UserImg } from '../userImg';
import { logout } from '../../store/actions/user.action';
import logoImg from '../../assets/img/logo.png'

export const AppHeader = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { user } = useSelector(stateModule => stateModule.userModule)
    const { robots } = useSelector(stateModule => stateModule.robotModule)
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const onLogout = () => {
        dispatch(logout())
        setIsMenuOpen(false)
        navigate('/login')
    }

    return (
        <section className="app-header-secend">
            <section className="app-header">
                <main className="main-layout">
                    <Link to="/" className="logo">
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

                            {isMenuOpen && <main>
                                {user && <header>
                                    <UserImg user={user} />
                                    <h2>Hi {user.fullname}</h2>
                                </header>}

                                <nav className='hamburger-nav'>
                                    {user && <NavLink to={`/users/${user._id}`} onClick={() => setIsMenuOpen(false)}>My Profile</NavLink>}
                                    {!user && <NavLink to="/login" onClick={() => setIsMenuOpen(false)}>Login</NavLink>}
                                    <NavLink to="/" className="small-screen-nav-item" onClick={() => setIsMenuOpen(false)}>Home</NavLink>
                                    <NavLink to="/robots" className="small-screen-nav-item" onClick={() => setIsMenuOpen(false)}>Robots</NavLink>
                                    {user?.isAdmin && <NavLink to="/users" className="small-screen-nav-item" onClick={() => setIsMenuOpen(false)}>Users</NavLink>}
                                    <NavLink to="/dashboard" className="small-screen-nav-item" onClick={() => setIsMenuOpen(false)}>Dashboard</NavLink>
                                    <NavLink to="/about" className="small-screen-nav-item" onClick={() => setIsMenuOpen(false)}>About</NavLink>
                                </nav>
                                {user && <button className="logout-btn" onClick={() => onLogout()}>Logout</button>}
                            </main>}
                        </div>
                    </section>
                </main>
            </section>
            <div className="header-titles-container">
                <div className="header-inf"><h3>Robots: {robots.length}</h3></div></div>
        </section>
    )
}