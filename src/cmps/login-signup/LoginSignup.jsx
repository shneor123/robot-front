import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { login, signup } from '../../store/actions/user.action'


import { LoginForm } from './LoginForm'
import { SignupForm } from './SignupForm'


export const LoginSignup = ({ type }) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    const [isError, setIsError] = useState(false)

    useEffect(() => {
        setIsError(false)
    }, [location])

    const onSignup = async (credentials) => {
        await dispatch(signup(credentials))
        navigate('/robots')
    }

    const onLogin = async (credentials) => {
        try {
            await dispatch(login(credentials))
            navigate('/robots')
        } catch (err) {
            setIsError(true)
        }
    }


    var cmp

    switch (type) {
      case 'login':
        cmp = <LoginForm onLogin={onLogin} />
        break
      case 'signup':
        cmp = <SignupForm onSignup={onSignup} />
        break
      default:
        break
    }

    return (
        <div className="login-signup">
          {isError && (
            <div className="error-message">
              <p>Invalid username or password.</p>
            </div>
          )}
          {cmp}
          <div className="login-method">
            <div>OR</div>
            <button onClick={() => navigate('/robots')}>Continue as Guest</button>
          </div>
          <hr />
          <footer>
            <Link to="/">Back home</Link>
            <Link to={type === 'login' ? '/signup' : '/login'}>{type === 'login' ? 'Sign up' : 'Log in'}</Link>
          </footer>
        </div>
      )
    }
    