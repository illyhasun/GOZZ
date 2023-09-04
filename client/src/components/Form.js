import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useHttp } from '../hooks/useHttpHook';
import Preloader from './Preloader';


const Form = () => {
    const { t, i18n } = useTranslation();
    const { req, loading, error, message } = useHttp();
    const [form, setForm] = useState({ name: '', phone: '', mail: '', text: '' })

    const formRef = useRef();

    const scrollToForm = () => {
        formRef.current.scrollIntoView({ behavior: 'smooth' });
    };


    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setForm((prevValues) => ({ ...prevValues, [name]: value }));
    };

    const sendHandler = async (event) => {
        event.preventDefault();

        try {
            const result = await req(`/api/form/customer?lang=${i18n.language}`, 'POST', { ...form })
            setForm({ name: '', phone: '', mail: '', text: '' });
        } catch (e) {
            console.log(e)
        }
    }
    if (error && error.length > 0) {
        console.log(error)
        scrollToForm();
    }
    const messageRef = useRef();

    useEffect(() => {
        if (message && messageRef.current) {
            messageRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [message]);

    return (
        <div className='form-container' ref={formRef}>
            <div className='form-content'>
                <div className='form-text'>
                    <h3 id='form'>{t('FormH3')}</h3>
                    <h4>{t('FormH4')}</h4>
                </div>
                <div className='form'>
                    <div className='div-form'>
                        <ul className='errors'>
                            {error && error.map((err, index) => (
                                <li className='err' key={index}>{err.msg}</li>
                            ))}

                        </ul>
                        <form onSubmit={sendHandler}>
                            <div className='form-group'>
                                <input
                                    placeholder={t('formName')}
                                    type='text'
                                    name='name'
                                    value={form.name}
                                    onChange={handleInputChange}
                                    required
                                />

                                <input
                                    placeholder={t('formPhone')}
                                    type='text'
                                    value={form.phone}
                                    name='phone'
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className='mail'>
                                <input
                                    placeholder={t('formMail')}
                                    type='text'
                                    name='mail'
                                    value={form.mail}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className='textarea'>
                                <textarea
                                    placeholder={t('formText')}
                                    value={form.text}
                                    name='text'
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className='form-send'>
                                <div className="checkbox">
                                    <input id="check2" type="checkbox" name="check" required />
                                    <label htmlFor="check2">{t('FormLabel')}</label>
                                </div>

                                <button
                                    className='leaf_button'
                                    type='submit'
                                    disabled={loading}
                                >
                                    {loading ? t('Sending') : t('Send')}

                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            {loading ? <Preloader /> :
                message && <li className='message' ref={messageRef}>{message}</li>
                }
        </div>
    );
};

export default Form;