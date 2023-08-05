import React from 'react'
import { useTranslation } from 'react-i18next';


export default function Preview() {
    const { t } = useTranslation();
    return ( 
            <div className='preview'>
                <div className='bg_group'>
                    <img className='bg' src='/images/bg1.svg' alt='leaf' />
                    <img className='bg' src='/images/bg2.svg' alt='leaf' />
                    <div className='bg_text'>
                        <h1 dangerouslySetInnerHTML={{ __html: t('unleash') }} />
                        <h4>Wholesale Supply of Exclusive Salad Greens for Your Restaurant's Masterpieces</h4>
                        <div>
                            <button className='leaf_button'>Leave request</button>
                            <h3>Description</h3>
                        </div>
                    </div>
                </div>
            </div>
    )
}