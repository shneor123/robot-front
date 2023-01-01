
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
import { useTranslation } from 'react-i18next';

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

export function LoginSignUp() {
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

    const { t } = useTranslation()

    return (
        <section className='login-signup'>
            <div className="alert-success">
                <div>
                    <strong className='space'>Demo Admin User: </strong> Admin |{" "}
                    <strong className='space'>Password:{""} </strong> Admin1234
                </div>
            </div>

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
                        <Typography component="h1" variant="h5">{isLogin ? t("login") : t("signup")}</Typography>
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
                                        label={t("remember")}
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
                                        {isLogin ? t("Dont_account") : t("already")}
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