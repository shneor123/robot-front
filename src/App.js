import React from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom"
import { AboutPage } from "./pages/AboutPage";
import { HomePage } from "./pages/HomePage";
import { RobotApp } from "./pages/RobotApp";
import { AppHeader } from "./cmps/general/AppHeader";



function App() {
  return (
    <Router>
    <AppHeader />
      <Routes>
        <Route element={<HomePage />} path={'/'} />
        <Route element={<AboutPage />} path={'/about'} />
        <Route element={<RobotApp />} path={'/robots'} />

      </Routes>
    </Router>
  )
}

export default App
