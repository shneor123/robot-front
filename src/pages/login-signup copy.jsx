import React, { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router"
import { Link, useLocation } from "react-router-dom"
import { FiPaperclip } from "react-icons/fi";

import { useForm } from "../hooks/useForm"
import { login, signup } from "../store/actions/user.action"
import { ImgUploader } from "../cmps/general/img-uploader"

export const LoginSignup = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { pathname } = useLocation()

    const [toggleShow, setToggleShow] = useState(false)
    const [isSignup, setIsSignup] = useState(false)
    const [credentials, handleChange, setCredentials] = useForm({
        username: "",
        password: "",
        fullname: "",
    })

    useEffect(() => {
        onIsSignup()
        clearState()
    }, [pathname])

    const clearState = () => {
        setCredentials({ username: "", password: "", fullname: "", imgUrl: "" })
    }

    const onIsSignup = () => {
        if (pathname === "/signup") setIsSignup(true)
        else setIsSignup(false)
    }

    const signUp = (ev = null) => {
        if (ev) ev.preventDefault()
        if (!credentials.username || !credentials.password || !credentials.fullname)
            return
        dispatch(signup(credentials))
        navigate("/login")
        clearState()
    }

    const onLogin = (ev) => {
        if (ev) ev.preventDefault()
        if (!credentials.username) return
        dispatch(login(credentials))
        setTimeout(() => {
            navigate("/robots")
            clearState()
        }, 500);
    }


    const onUploaded = (imgUrl) => {
        setCredentials({ ...credentials, imgUrl });
    }


    return (
        <section className="login-page flex column">
            <header className="login-header">
                <h1>My Store</h1>{" "}
            </header>
            <div className="login-signup-container">
                <div className="form">
                    <form className="flex column " onSubmit={isSignup ? signUp : onLogin}>
                        {isSignup ? (
                            <>
                                {" "}
                                <h1>Sign up for your account</h1>
                                <input
                                    type="text"
                                    id="fullname"
                                    name="fullname"
                                    placeholder="Enter full name"
                                    value={credentials.fullname}
                                    onChange={handleChange}
                                />
                                <div>
                                    <p className="upper-login-attach ">
                                        {<button className="btn-opt-login"
                                            onClick={() => setToggleShow(!toggleShow)} >
                                            <span className="badge"><FiPaperclip /></span>
                                            {toggleShow ? 'Hide details' : 'Attach'}
                                        </button>}
                                    </p>
                                    {toggleShow && <div className='attach'>
                                        <ImgUploader onUploaded={onUploaded} />
                                        <input
                                            className="inputAttach"
                                            type="text"
                                            id="upload-file-url"
                                            name="imgUrl"
                                            placeholder="Enter link img profile"
                                            value={credentials.imgUrl}
                                            onChange={handleChange} />
                                    </div>
                                    }
                                </div>
                            </>
                        ) : (
                            <h1>Login to Store</h1>
                        )}
                        <input
                            type="text"
                            id="username"
                            name="username"
                            placeholder="Enter username"
                            value={credentials.username}
                            onChange={handleChange}
                        />
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Enter password"
                            value={credentials.password}
                            onChange={handleChange}
                        />
                        <button className={`logbtn ${isSignup ? "signup" : "login"}`}>
                            {isSignup ? "Sign up" : "Log in"}
                        </button>
                    </form>
                    <hr />
                    <div className="dif-choice flex">
                        <Link to="/">Back Home</Link>
                        {isSignup ? (
                            <Link to="/login"> Log In</Link>
                        ) : (
                            <Link to="/signup"> Sign up for an account</Link>
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}











import React, { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { userService } from '../services/user.service';
import { login, signup } from '../store/actions/user.action';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

let theme = createTheme({
    palette: {
        primary: {
            main: '#540a8a', //vars: primary-clr-900
        },
        secondary: {
            main: '#f5f5f5',  //vars: primary-clr-100
        },
    },
});

export function LoginSignup() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const usernameInputRef = useRef()
    const passwordInputRef = useRef()
    const { pathname } = useLocation()
    const [isLogin, setIsLogin] = useState(true)
    const [errorMsg, setErrorMsg] = useState('')

    useEffect(() => {
        setIsLogin(pathname === '/login')
    }, [pathname])

    const onSubmit = async (ev) => {
        ev.preventDefault()
        const resetEmailAndPassword = () => {
            usernameInputRef.current.value = ''
            usernameInputRef.current.focus()
            passwordInputRef.current.value = ''
        }

        const data = new FormData(ev.currentTarget);
        const user = {
            username: data.get('username'),
            password: data.get('password'),
        }
        const isRemember = !!data.get('remember')
        if (isLogin) {
            try {
                const loggedInUser = await userService.login(user, isRemember)
                dispatch(login(loggedInUser, false))
            } catch (err) {
                if (err.response?.status === 401) {
                    setErrorMsg('Wrong username or password')
                    resetEmailAndPassword()
                }
                else console.log(err)

                return
            }
        } else {
            try {
                user.fullname = `${data.get('firstName')} ${data.get('lastName')}`
                const loggedInUser = await userService.signup(user, isRemember)
                dispatch(signup(loggedInUser, false))
            } catch (err) {
                if (err.response?.status === 406) {
                    setErrorMsg('Username already taken')
                    resetEmailAndPassword()
                }
                else console.log(err)

                return
            }
        }
        navigate('/robots')
    }

    return (
        <section className='login-signup'>
            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="xs">
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'rgb(84, 10, 138)' }} />
                        <Typography component="h1" variant="h5">{isLogin ? 'Login' : 'Sign up'}</Typography>
                        <Box component="form" onSubmit={onSubmit} sx={{ mt: 3 }}>
                            <Grid container spacing={2}>
                                {!isLogin && <>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            autoComplete="given-name"
                                            name="firstName"
                                            required
                                            fullWidth
                                            id="firstName"
                                            label="First Name"
                                            autoFocus
                                            color='primary'
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            required
                                            fullWidth
                                            id="lastName"
                                            label="Last Name"
                                            name="lastName"
                                            autoComplete="family-name"
                                        />
                                    </Grid>
                                </>}
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="username"
                                        label="Username"
                                        name="username"
                                        autoComplete="new-username"
                                        inputProps={{ minLength: 3 }}
                                        inputRef={usernameInputRef}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        autoComplete="new-password"
                                        inputProps={{ minLength: 3 }}
                                        inputRef={passwordInputRef}
                                    />
                                </Grid>
                                {errorMsg && <p className='error-msg'>{errorMsg}</p>}
                                <Grid item xs={12}>
                                    <FormControlLabel
                                        control={<Checkbox defaultChecked={true} value={true} color="primary" name="remember" />}
                                        label="Remember me"
                                    />
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2, bgcolor: 'rgb(84, 10, 138)' }}
                            >
                                {isLogin ? 'Login' : 'Sign Up'}
                            </Button>
                            <Grid container justifyContent="flex-end">
                                <Grid item>
                                    <Link className="login-mode-switch" href={isLogin ? '/#/signup' : '/#/login'} variant="body2" onClick={() => setErrorMsg('')}>
                                        {isLogin ? 'Don\'t have an account? Sign Up' : 'Already have an account? Log In'}
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider>
        </section>
    )
}