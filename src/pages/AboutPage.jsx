import React from 'react';
import { Link } from 'react-router-dom'
import { useRef } from 'react';
import { GoogleMap } from '../cmps/GoogleMap'
export const AboutPage = () => {

    const markers = useRef([
        { title: 'Tel-Aviv', lat: 32.109333, lng: 34.855499 },
        { title: 'Hadera', lat: 32.434046, lng: 34.919652 },
        { title: 'Bat Yam', lat: 32.013186, lng: 34.748019 },
        { title: 'Jerusalem', lat: 31.771959, lng: 35.217018 },
        { title: 'Kiryat Malachi', lat: 31.73, lng: 34.75, },
        { title: 'New York', lat: 40.730610, lng: -73.935242 }
    ])

    return (
        <section className="about-page main-layout">
            <h1 className='page-header'>About us</h1>
            <p><Link to='/robots'>Robo Store</Link> is a <span className='fake'>fake</span> robot retailer.</p>
            <p>We ship our products all over the world.</p>
            <p>The company's stores are located in Israel.</p>
            <GoogleMap markers={markers.current} defaultLocation={{ lat: 32.209333, lng: 34.855499 }} />
        </section>
    );
}