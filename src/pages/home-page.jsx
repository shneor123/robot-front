import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { robotService } from '../services/robot.service'
import defaultRobotImg from '../assets/img/blue-robot.png'
import { useSelector } from 'react-redux'
import { HeroPage } from '../i18-leng/hero-page'

import "/node_modules/flag-icons/css/flag-icons.min.css"
import { useTranslation } from 'react-i18next'


export const HomePage = () => {

    const loggedInUser = useSelector(storeState => storeState.userModule.user)
    const [robotImg, setRobotImg] = useState(defaultRobotImg)
    const [blinkImgClass, setBlinkImgClass] = useState(false)
    const robotImgIntervalId = useRef()

    useEffect(() => {
        robotImgIntervalId.current = setInterval(() => {
            setBlinkImgClass(false)
            const robotImg = robotService.getRandomRobotImg()
            setRobotImg(robotImg)
        }, 3000)

        return () => {
            clearInterval(robotImgIntervalId.current)
        }
    }, [])

    const { t } = useTranslation()
    
    return (
        <section className="home-page main-layout">
            <section className='hero'>
                <HeroPage />
                <div>
                    <h1>{t("header_logo")}</h1>
                    <h2>{t("home_text")}</h2>
                </div>
                <img className={`robot-img blink-img ${blinkImgClass ? 'visible' : 'invisible'}`}
                    onLoad={() => setBlinkImgClass(true)} src={robotImg} alt="robot"
                    onError={({ target }) => { setBlinkImgClass(true); target.src = defaultRobotImg }}
                />
            </section>
            {!loggedInUser && <section className='login'>
                <Link to='/login' className='login'>{t("login")}</Link>
                <Link to='/robots'>{t("home_start")}</Link>
            </section>}
            {loggedInUser && <section className='get-started'>
                <Link to='/robots'>{t("home_take_me")}</Link>
            </section>}
        </section>
    )
}