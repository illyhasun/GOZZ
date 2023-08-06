import React, { useContext, useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Footer() {
    const [nav, setNav] = useState(false)

    const handleNavLinkClick = (e, target) => {
        e.preventDefault();
        const element = document.getElementById(target);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
        setNav(false)
    };

    const { t, i18n } = useTranslation();




    return (
        <footer>
            <ul>
                <li><NavLink to='/'><img className="logo" src="/images/logo.svg" alt="Kert" /></NavLink></li>
                <li onClick={(e) => handleNavLinkClick(e, 'catalog')}>Our product</li>
                <li onClick={(e) => handleNavLinkClick(e, 'form')}>Contact us</li>
            </ul>
            <ul>
                <li><div>
                    <img className="icon" src="/icons/facebook.svg" alt="Kert" />
                    <img className="icon" src="/icons/viber.svg" alt="Kert" />
                    <img className="icon" src="/icons/instagram.svg" alt="Kert" />
                </div></li>
            </ul>


        </footer>
    );
}