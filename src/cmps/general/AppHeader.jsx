import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, NavLink } from 'react-router-dom'
import logoImg from '../../assets/img/logo.png'
import { logout } from '../../store/actions/user.action';

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
            </section>
        </main>
    </section>
}