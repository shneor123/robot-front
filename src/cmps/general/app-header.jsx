import { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { logout } from '../../store/actions/user.action';
import { UserImg } from './user-img';
import logoImg from '../../assets/img/logo.png'
import { useTranslation } from 'react-i18next';

export const AppHeader = () => {
    const { user } = useSelector(stateModule => stateModule.userModule)
    const { robots } = useSelector(stateModule => stateModule.robotModule)
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const { pathname } = useLocation()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    let menuRef = useRef()

    const onUserLogout = () => {
        dispatch(logout())
        setIsMenuOpen(false)
        navigate('/login')
    }

    const linkList =
        [
            {
                to: '/',
                trans: 'header_home'
            }, {
                to: '/robots',
                trans: 'header_robot'
            }, {
                to: '/users',
                trans: 'header_users'
            }, {
                to: '/dashboard',
                trans: 'header_dashboard'
            }, {
                to: '/about',
                trans: 'header_about'
            }
        ]

    const [lang, setLang] = useState('he')
    const { t: translate } = useTranslation()

    return (
        <section className="app-header-secend">
            <section className="app-header">
                <main className="main-layout">
                    <Link to={"/"} className="logo">
                        <img src={logoImg} alt="Robo Store logo" />
                        <h2>Robo Store</h2>
                    </Link>
                    <section className='header-navbar'>
                        <nav className='full-screen-nav'>

                            {/* {linkList.map(link => {
                                const { to, trans } = link
                                return <a key={to} href={to}>{translate(trans)}</a>
                            })} */}

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
                            <div className={`screen ${isMenuOpen ? 'open' : ''}`} onClick={() => setIsMenuOpen(!isMenuOpen)}></div>
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


// useEffect((ev) => {
    // document.addEventListener("mousedown", eventListeners)
    // return () => {
    //     document.removeEventListener('mousedown', eventListeners)
    // }
// }, [])

// const eventListeners = (ev) => {
//     if (!menuRef.current?.contains(ev.target)) {
//         setIsMenuOpen(false)
//     }
// }