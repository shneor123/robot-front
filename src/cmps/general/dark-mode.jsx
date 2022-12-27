import React, { useState, useEffect } from 'react';
import { storageService } from '../../services/basic/storage.service'
import { BsFillSunFill, BsMoonStarsFill } from 'react-icons/bs';

export const DarkMode = () => {
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        !isDark ? document.body.classList.add('dark') : document.body.classList.remove('dark')
        isDark ? storageService.saveToStorage('theme', 'dark') : storageService.saveToStorage('theme', 'bright')
    }, [isDark])

    const onToggleDarkMode = () => {
        setIsDark(!isDark)
    }

    return (
        <section>
                <div className='header-content flex justify-between align-center'>
                    {isDark && <BsFillSunFill className='toggle-darkmode-icon sun' onClick={() => { onToggleDarkMode() }} />}
                    {!isDark && <BsMoonStarsFill className='toggle-darkmode-icon moon' onClick={() => { onToggleDarkMode() }} />}
                </div>
        </section>
    )
}
