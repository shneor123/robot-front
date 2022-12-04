import React from "react";
import { Route, Routes } from "react-router-dom"
import { AboutPage } from "./pages/AboutPage";
import { HomePage } from "./pages/HomePage";
import { RobotApp } from "./pages/RobotApp";
import { RobotDetails } from "./pages/RobotDetails";
import { AppHeader } from "./cmps/general/AppHeader";
import { RobotEdit } from "./cmps/RobotEdit";
import { LoginSignup } from "./pages/LoginSignup";
import { UserMsg } from "./cmps/general/userMsg";
import { UserProfile } from "./pages/info/UserProfile";
import { UserEdit } from "./pages/info/UserEdit";



function App() {
  return (
    <section className="app">
      <AppHeader />
      <main>
        <Routes>
          <Route element={<LoginSignup />} path={'/login'} />
          <Route element={<LoginSignup />} path={'/signup'} />
          <Route element={<RobotApp />} path={'/robots'} />
          <Route element={<RobotDetails />} path={'/robots/:id'} />
          <Route element={<RobotEdit />} path={'/robots/edit/:id'} />
          <Route element={<RobotEdit />} path={'/robots/edit/'} />
          <Route element={<UserProfile />} path={'/users/:id'} />
          <Route element={<UserEdit />} path={'/users/edit/:id'} />

          <Route element={<HomePage />} path={'/'} />
          <Route element={<AboutPage />} path={'/about'} />
        </Routes>
      </main>
      <UserMsg />
    </section>
  )
}

export default App
