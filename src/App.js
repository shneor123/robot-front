import React from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom"
import { AboutPage } from "./pages/AboutPage";
import { HomePage } from "./pages/HomePage";



function App() {
  return (
    <Router>
      <Routes>
        <Route element={<HomePage />} path={'/'} />
        <Route element={<AboutPage />} path={'/about'} />
      </Routes>
    </Router>
  )
}

export default App
