import React, { useState } from "react"
import { HashRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom"

import { AboutPage } from "./pages/about-page"
import { HomePage } from "./pages/home-page"
import { RobotApp } from "./pages/robot-app"
import { RobotDetails } from "./pages/robot-details"
import { AppHeader } from "./cmps/general/app-header"
import { RobotEdit } from "./cmps/robot-edit"
import { LoginSignUp } from "./pages/login-signup"
import { UserMsg } from "./cmps/general/user-msg"
import { UserProfile } from "./cmps/users/user-profile"
import { UserEdit } from "./cmps/users/user-edit"
import { UserApp } from "./pages/user-app"
import { Dashboard } from "./pages/Dashboard"

import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition"

function App() {
  // const commands = [
  //   {
  //     command: ["Go to * page", "Go *", "Open * page", "Open *"],
  //     callback: (redirectPage) => setRedirectUrl(redirectPage),
  //   },
  // ];
  
  // const { transcript } = useSpeechRecognition({ commands });
  // const [redirectUrl, setRedirectUrl] = useState("");
  // const pages = ["home", "login", "new blog post", "contact"];
  // const urls = {
  //   home: "/",
  //   blog: "/blog",
  //   "new blog post": "/blog/new",
  //   contact: "/contact",
  // };
  
  // if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
  //   return null;
  // }

  // let redirect = "";

  // if (redirectUrl) {
  //   if (pages.includes(redirectUrl)) {
  //     // navigate (`${urls[redirectUrl]}`) 
  //   } else {
  //     redirect = <p>Could not find page: {redirectUrl}</p>;
  //   }
  // }


  return (
    <section className="app">

      <Router>
        <AppHeader />
        <Routes>
          <Route element={<LoginSignUp />} path={'/login'} />
          <Route element={<LoginSignUp />} path={'/signup'} />

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
        {/* {redirect} */}
      </Router>

      {/* <p id="transcript">Transcript: {transcript}</p> */}

      {/* <button onClick={SpeechRecognition.startListening}>Start</button> */}

    </section>
  )
}

export default App
