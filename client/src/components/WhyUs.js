import React from 'react'
import { useTranslation } from 'react-i18next';


export default function WhyUs() {
    const { t } = useTranslation();

    return (
        <div className='why-container' id='whyUs'>
            <div className='why-us'>
                <h3>{t('whyUs')}</h3>
                <div className='why-bloks'>
                    <div>
                        <img src='/icons/like.svg' alt='like'/>
                        <h3><span>{t('whyUs1title')}</span></h3>
                        <h4><span>{t('whyUs1desc')}</span></h4>
                    </div>
                    <div>
                        <img src='/icons/seeds.svg' alt='seeds'/>
                        <h3><span>{t('whyUs2title')}</span></h3>
                        <h4><span>{t('whyUs2desc')}</span></h4>
                    </div>
                    <div>
                        <img src='/icons/person.svg' alt='person'/>
                        <h3><span>{t('whyUs3title')}</span></h3>
                        <h4><span>{t('whyUs4desc')}</span></h4>
                    </div>
                </div>
            </div>
        </div>
    )
}
