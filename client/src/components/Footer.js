import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Footer() {
    const { t, i18n } = useTranslation();

    const handleNavLinkClick = (e, target) => {
        e.preventDefault();
        const element = document.getElementById(target);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }



    return (
        <footer>
            <ul>
                <li><NavLink to='/' className='logo-text'><img className="logo" src="/images/logo.svg" alt="Kert" /></NavLink></li>
                <li onClick={(e) => handleNavLinkClick(e, 'catalog')}>{t('OurProducts')}</li>
                <li onClick={(e) => handleNavLinkClick(e, 'form')}>{t('ContactUs')}</li>
            </ul>
            <ul>
                <li><div className='social-networks'>
                    <a href='https://www.facebook.com' target="_blank" rel="noopener noreferrer"><img className="icon" src="/icons/facebook.svg" alt="facebook" /></a>
                    <a href='https://www.viber.com/ua/' target="_blank" rel="noopener noreferrer"><img className="icon" src="/icons/viber.svg" alt="viber" /></a>
                    <a href='https://www.instagram.com' target="_blank" rel="noopener noreferrer"><img className="icon" src="/icons/instagram.svg" alt="Instagram" /></a>
                </div></li>
            </ul>


        </footer>
    );
}