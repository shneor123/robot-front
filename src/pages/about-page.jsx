import React from 'react';
import { Link } from 'react-router-dom'
import { useRef } from 'react';
import { GoogleMap } from '../cmps/google-map'
import { useTranslation } from 'react-i18next';
export const AboutPage = () => {
    const { t: translate } = useTranslation()

    const markers = useRef([
        { title: translate("about_tel_aviv"), lat: 32.109333, lng: 34.855499 },
        { title: translate("about_hadera"), lat: 32.434046, lng: 34.919652 },
        { title: translate("about_bat_yam"), lat: 32.013186, lng: 34.748019 },
        { title: translate("about_jerusalem"), lat: 31.771959, lng: 35.217018 },
        { title: translate("about_kiryat_malachi"), lat: 31.73, lng: 34.75, },
        { title: translate("about_new_york"), lat: 40.730610, lng: -73.935242 }
    ])

    
    return (
        <main className="about-page-container">
            <div className='about-container'>
                <div>
                    <h2 className='page-header'>{translate('about_haeder')}</h2>
                    <p><Link to='/robots'>{translate("header_logo")}</Link> {translate("about_haeder_is_a")} <span className='fake'>{translate("about_haeder_fake")}</span> {translate("about_haeder_retailer")}</p>
                    <p>{translate("about_p_1")}</p>
                    <p>{translate("about_p_2")}</p>
                </div>
                {
                    <div className='visit-us-container'>
                        <h2>:{translate("about_haeder_2")}</h2>
                        {markers.current.map(branch =>
                            <h3 title={branch.lat} key={branch.lat}>
                                {branch.title}
                            </h3>
                        )}
                    </div>
                }
            </div>
            <div className='visit-us-container '>
                <div className='map' style={{ borderRadius: '4px', }}>
                    <GoogleMap markers={markers.current} defaultLocation={{ lat: 32.209333, lng: 34.855499 }} />
                </div>
            </div>
        </main >
    )
}