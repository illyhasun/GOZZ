import React from 'react'
import { useTranslation } from 'react-i18next';


export default function DetailWindow({ selectedProduct, onClose }) {
    const { i18n } = useTranslation()

    return (
            <>
                <img src={selectedProduct?.photo} alt={selectedProduct?.title} />
                <div>
                    <h3>{selectedProduct[i18n.language]?.title}</h3>
                    <h5>{selectedProduct[i18n.language]?.description}</h5>
                    <img className='close' onClick={onClose} src='/icons/close.svg' alt='close' />
                </div>
            </>
    );
};