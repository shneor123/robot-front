import { LoginSignup } from '../cmps/login-signup/login-signup'

export const LoginSignupPage = ({ type }) => {
  return (
    <main className="login-signup-page">
      <LoginSignup type={type} />
    </main>
  )
}
