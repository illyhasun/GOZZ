import React, { useContext, useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useTranslation } from 'react-i18next';

export default function Header() {
  const [nav, setNav] = useState(false)

  const handleNavLinkClick = (e, target) => {
    console.log('work')
    e.preventDefault();
    const element = document.getElementById(target);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setNav(false)
  };

  const lngs = {
    en: { nativeName: 'Engilsh' },
    cs: { nativeName: 'Čeština' },
    uk: { nativeName: 'Українська' },
    ru: { nativeName: 'Русский' },
  };

  const { t, i18n } = useTranslation();
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLanguageChange = (e) => {
    const selectedLanguage = e.target.value;
    i18n.changeLanguage(selectedLanguage);
  };

  const handleLogout = (e) => {
    e.preventDefault();
    auth.logout();
    navigate('/');
  };


  return (
    <div>
      <header>
        <ul>
          <img className="logo" src="/images/logo.svg" alt="Kert" />
          <li className='hide' onClick={(e) => handleNavLinkClick(e, 'catalog')}>Our product</li>
          <li className='hide' onClick={(e) => handleNavLinkClick(e, 'form')}>Contact us</li>
        </ul>
        <div className={nav ? 'not-active-menu menu-container' : 'active-menu menu-container'}>
          <ul>

            <li className='display' onClick={(e) => handleNavLinkClick(e, 'catalog')}><a href="#catalog">Our product</a></li>
            {/* <li className='display'><a href="#catalog">About us</a></li> */}
            <li className='display' onClick={(e) => handleNavLinkClick(e, 'form')}><a href="#catalog">Contact us</a></li>
            {auth.isAuthenticated && (
              <>
                <li><NavLink to="/create">Create</NavLink></li>
                <li><a href="/" onClick={handleLogout}>Logout</a></li>
              </>
            )}
            <li><select
              value={i18n.language}
              onChange={handleLanguageChange}
            >
              {Object.keys(lngs).map((lng) => (
                <option key={lng} value={lng}>
                  {lngs[lng].nativeName}
                </option>
              ))}
            </select></li>
            <li><div>
              <img className="icon" src="/icons/facebook.svg" alt="Kert" />
              <img className="icon" src="/icons/viber.svg" alt="Kert" />
              <img className="icon" src="/icons/instagram.svg" alt="Kert" />
            </div></li>
          </ul>
        </div>
        <div onClick={() => setNav(!nav)} className='burger'>

          {nav ? <img src='/icons/burger_close.svg' alt='close' /> : <img src='/icons/burger_open.svg' alt='close' />}

        </div>
      </header>
      <div className={`overlay ${nav ? "active" : ""}`} onClick={() => setNav(false)}></div>
    </div>
  );
}