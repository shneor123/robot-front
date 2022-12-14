import React from 'react';
import { Link } from 'react-router-dom'
import { useRef } from 'react';
import { GoogleMap } from '../cmps/google-map'
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
        <main className="about-page-container">
            <div className='about-container'>
                <div>
                    <h2 className='page-header'>About us</h2>
                    <p><Link to='/robots'>Robo Store</Link> is a <span className='fake'>fake</span> robot retailer.</p>
                    <p>We ship our products all over the world.</p>
                    <p>The company's stores are located in Israel.</p>
                </div>
                    <p className='p'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit a voluptatum aut dolores aperiam reiciendis tenetur, rem, natus architecto laboriosam distinctio quo iusto molestiae. Dicta ipsum ratione hic tempore doloribus!</p>
                {
                    <div className='visit-us-container'>
                        <h2>Our Place To Visit:</h2>
                        {markers.current.map(branch =>
                            <h3 key={branch.lat}>
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