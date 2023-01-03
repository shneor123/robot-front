import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next';

import { logout } from '../../store/actions/user.action';
import { DarkMode } from './dark-mode';
import { UserImg } from './user-img';

import logoImg from '../../assets/img/logo.png'
import { ShareProj } from '../share-pro';

export const AppHeader = () => {
    const { user } = useSelector(stateModule => stateModule.userModule)
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const onUserLogout = () => {
        dispatch(logout())
        setIsMenuOpen(false)
        navigate('/login')
    }

    const { t } = useTranslation()

    return (
        <section className="app-header-secend">
            <section className="app-header">
                <main className="main-layout">
                    <Link to={"/"} className="logo">
                        <img src={logoImg} alt="Robo Store logo" />
                        <h2>{t('header_logo')}</h2>
                    </Link>
                    <section className='header-navbar'>
                        <nav className='full-screen-nav'>
                            <NavLink to="/"> {t("header_home")} </NavLink>
                            <NavLink to="/robots"> {t("header_robot")} </NavLink>
                            {user?.isAdmin && <NavLink to="/users"> {t("header_users")} </NavLink>}
                            <NavLink to="/dashboard"> {t("header_dashboard")}</NavLink>
                            <NavLink to="/about"> {t("header_about")} </NavLink>
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
                                        {user && <NavLink to={`/users/${user._id}`} onClick={() => setIsMenuOpen(false)}>{t("header_profile")}</NavLink>}
                                        {!user && <NavLink to="/login" onClick={() => setIsMenuOpen(false)}>{t("login")}</NavLink>}
                                        <NavLink to="/" className="small-screen-nav-item" onClick={() => setIsMenuOpen(false)}>{t("header_home")}</NavLink>
                                        <NavLink to="/robots" className="small-screen-nav-item" onClick={() => setIsMenuOpen(false)}>{t("header_robot")}</NavLink>
                                        {user?.isAdmin && <NavLink to="/users" className="small-screen-nav-item" onClick={() => setIsMenuOpen(false)}>{t("header_users")}</NavLink>}
                                        <NavLink to="/dashboard" className="small-screen-nav-item" onClick={() => setIsMenuOpen(false)}>{t("header_dashboard")}</NavLink>
                                        <NavLink to="/about" className="small-screen-nav-item" onClick={() => setIsMenuOpen(false)}>{t("header_about")}</NavLink>
                                        <DarkMode />
                                    </nav>
                                    {user && <button className="logout-btn" onClick={() => onUserLogout()}>{t("header_logout")}</button>}
                                </main>}
                            <div className={`screen ${isMenuOpen ? 'open' : ''}`} onClick={() => setIsMenuOpen(!isMenuOpen)}></div>
                        </div>
                    </section>
                </main>
            </section >
                {/* <ShareProj /> */}
        </section >
    )
}

{/* <div className="qrcode">
<QRCode value="https://ca-robot-react.onrender.com/" size="150" />
</div> */}

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