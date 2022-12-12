import { LoginSignup } from '../cmps/login-signup/LoginSignup'

export const LoginSignupPage = ({ type }) => {
    return (
      <main className="login-signup-page">
        <LoginSignup type={type} />
      </main>
    )
  }