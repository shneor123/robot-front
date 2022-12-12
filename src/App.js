import React from "react"
import { HashRouter as Router, Routes, Route } from "react-router-dom"

import { AboutPage } from "./pages/AboutPage"
import { HomePage } from "./pages/HomePage"
import { RobotApp } from "./pages/RobotApp"
import { RobotDetails } from "./pages/RobotDetails"
import { AppHeader } from "./cmps/general/AppHeader"
import { RobotEdit } from "./cmps/RobotEdit"
import { LoginSignup, LoginSignupPage } from "./pages/LoginSignup"
import { UserMsg } from "./cmps/general/userMsg"
import { UserProfile } from "./pages/info/UserProfile"
import { UserEdit } from "./pages/info/UserEdit"
import { UserApp } from "./pages/UserApp"
import { Dashboard } from "./pages/Dashboard"

function App() {
  return (
    <section className="app">
      <Router>
        <AppHeader />
        <Routes>
          {/* <Route element={<LoginSignup />} path={'/login'} />
          <Route element={<LoginSignup />} path={'/signup'} /> */}
          <Route path="/login" element={<LoginSignupPage type="login" />} />
          <Route path="/signup" element={<LoginSignupPage type="signup" />} />
          <Route element={<RobotApp />} path={'/robots'} />
          <Route element={<RobotDetails />} path={'/robots/:id'} />
          <Route element={<RobotEdit />} path={'/robots/edit/:id'} />
          <Route element={<RobotEdit />} path={'/robots/edit/'} />
          <Route element={<UserProfile />} path={'/users/:id'} />
          <Route element={<UserEdit />} path={'/users/edit/:id'} />
          <Route element={<UserApp />} path={'/users'} />
          <Route element={<Dashboard />} path={'/dashboard'} />
          <Route element={<HomePage />} path={'/'} />
          <Route element={<AboutPage />} path={'/about'} />
        </Routes>
        <UserMsg />
      </Router>
    </section>
  )
}

export default App
