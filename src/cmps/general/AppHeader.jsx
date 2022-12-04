import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, NavLink } from 'react-router-dom'
import logoImg from '../../assets/img/logo.png'
import { logout } from '../../store/actions/user.action';
import { UserImg } from '../userImg';

export const AppHeader = () => {

    const dispatch = useDispatch()
    const user = useSelector(stateModule => stateModule.userModule.user)
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const onLogout = () => {
        dispatch(logout())
        setIsMenuOpen(false)
    }

    return <section className="app-header">
        <main className="main-layout">
            <Link to="/" className="logo">
                <img src={logoImg} alt="Robo Store logo" />
                <h2>Robo Store</h2>
            </Link>
            <section className='header-navbar'>
                <nav className='full-screen-nav'>
                    <NavLink to="/" exact="true">Home</NavLink>
                    <NavLink to="/robots">Robots</NavLink>
                    {user?.isAdmin && <NavLink to="/users" >Users</NavLink>}
                    <NavLink to="/dashboard">Dashboard</NavLink>
                    <NavLink to="/about" >About</NavLink>
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
                            {user && <NavLink to={`/users/${user._id}`} exact="true" onClick={() => setIsMenuOpen(false)}>My Profile</NavLink>}
                            {!user && <NavLink to="/login" onClick={() => setIsMenuOpen(false)}>Login</NavLink>}
                            <NavLink to="/" exact="true" className="small-screen-nav-item" onClick={() => setIsMenuOpen(false)}>Home</NavLink>
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
}