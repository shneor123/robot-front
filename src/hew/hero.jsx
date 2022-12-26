import { useState } from 'react';
import i18n from '../services/basic/i18n';
import languages from './languages';
import Globe from '../icons/globe'

export const Hero = () => {
  const [language, setLanguage] = useState('he')
  const [isLanguagePickerOpen, setLanguagePicker] = useState(false)

  const changeLang = (lang) => {
    i18n.changeLanguage(lang)
    setLanguage(lang)
  }

  return (
    <div className="hero-2 full">
      <div className={`languages-wrapper ${language === 'he' ? 'rtl' : 'ltr'} ${isLanguagePickerOpen ? 'open' : ''}`}>
        <button onClick={() => setLanguagePicker(!isLanguagePickerOpen)}>{<Globe />}</button>
        <ul className='languages'>

          {languages.map(lang => {
            return <li key={lang.code}
              onClick={() => changeLang(lang.lang)}
              className={`fi fi-${lang.code}`}
            >
            </li>
          })}
        </ul>
      </div>
    </div>
  )
}