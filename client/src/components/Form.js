// import React, { useState } from 'react';
// import { useTranslation } from 'react-i18next';
// import { useHttp } from '../hooks/useHttpHook';
// import Preloader from './Preloader';

// const CreateProduct = () => {
//     const { t, i18n } = useTranslation();
//     const { req, loading, error, message } = useHttp();
//     const [form, setForm] = useState({ name: '', phone: '', mail: '', text: '' })
//     const changeHandler = (e) => {
//         setForm({ ...form, [e.target.name]: e.target.value })
//     }
//     const sendHandler = async () => {
//         try {
//             const data = await req(`/api/form/customer?lang=${i18n.language}`, 'POST', { ...form })
//         } catch (e) {
//             console.log(e)
//         }
//     }

//     return (
//         <>
//             <div>CreateProduct</div>
//             <ul>
//                 {loading ? <Preloader /> :
//                     message && <li className='err'>{message}</li>}
//                 {error && error.map((err, index) => (
//                     <li className='err' key={index}>{err.msg}</li>
//                 ))}

//             </ul>
//             <input
//                 placeholder='name'
//                 type='text'
//                 id='name'
//                 name='name'
//                 onChange={changeHandler}
//                 required
//             />

//             <input
//                 placeholder='phone'
//                 type='text'
//                 id='phone'
//                 name='phone'
//                 onChange={changeHandler}
//                 required
//             />
//             <input
//                 placeholder='E-mail'
//                 type='text'
//                 id='mail'
//                 name='mail'
//                 onChange={changeHandler}
//                 required
//             />
//             <textarea
//                 placeholder='Text from you'
//                 id="text"
//                 name='mail'
//                 onChange={changeHandler}
//             />
//             <button
//                 className='main-button'
//                 onClick={sendHandler}
//                 disabled={loading}
//             >
//                 create
//             </button>
//         </>
//     );
// };

// export default CreateProduct;


// import React, { useState } from 'react';
// import { useTranslation } from 'react-i18next';
// import { useHttp } from '../hooks/useHttpHook';
// import Preloader from './Preloader';

// export default function Form() {
//     const { t, i18n } = useTranslation();
//     const { req, loading, error, message } = useHttp();
//     const [form, setForm] = useState({ name: '', phone: '', mail: '', text: '' })

//     const handleInputChange = (event) => {
//         const { name, value } = event.target;
//         setForm((prevValues) => ({ ...prevValues, [name]: value }));
//     };

//     const sendHandler = async (event) => {
//         event.preventDefault();

//         try {
//             const formData = new FormData();
//             formData.append('name', form.name);
//             formData.append('phone', form.phone);
//             formData.append('mail', form.mail);
//             formData.append('text', form.text);
//             const result = await req(`/api/form/customer?lang=${i18n.language}`, 'POST', formData)
//         } catch (e) {
//             console.log(e)
//         }
//     }

//     return (
//         <div className='form-container'>
//             <div className='form-content'>
//                 <h3>Reserve your lettuce</h3>
//                 <h4>We'll call soon, all in good hands!</h4>
//                 <div className='form'>
//                     <div className='div-form'>
//                         <ul>
//                             {loading ? <Preloader /> :
//                                 message && <li className='err'>{message}</li>}
//                             {error && error.map((err, index) => (
//                                 <li className='err' key={index}>{err.msg}</li>
//                             ))}

//                         </ul>
//                         <form onSubmit={sendHandler}>
//                             <div className='form-group'>
//                                 <input
//                                     placeholder='name'
//                                     type='text'
//                                     name='name'
//                                     value={form.name}
//                                     onChange={handleInputChange}
//                                     required
//                                 />

//                                 <input
//                                     placeholder='phone'
//                                     type='text'
//                                     value={form.phone}
//                                     name='phone'
//                                     onChange={handleInputChange}
//                                     required
//                                 />
//                             </div>
//                             <div className='mail'>
//                                 <input
//                                     placeholder='mail'
//                                     type='text'
//                                     name='mail'
//                                     value={form.mail}
//                                     onChange={handleInputChange}
//                                     required
//                                 />
//                             </div>import React, { useState } from 'react';
// import { useTranslation } from 'react-i18next';
// import { useHttp } from '../hooks/useHttpHook';
// import Preloader from './Preloader';

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHttp } from '../hooks/useHttpHook';
import Preloader from './Preloader';


const CreateProduct = () => {
    const { t, i18n } = useTranslation();
    const { req, loading, error, message } = useHttp();
    const [form, setForm] = useState({ name: '', phone: '', mail: '', text: '' })


    const notCheckedImage = {
        backgroundImage: `url(${process.env.PUBLIC_URL + "/icons/check.svg"})`
    };
    const checkedImage = {
        backgroundImage: `url(${process.env.PUBLIC_URL + "/icons/checked.svg"})`
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setForm((prevValues) => ({ ...prevValues, [name]: value }));
    };

    const sendHandler = async (event) => {
        event.preventDefault();

        try {
            const result = await req(`/api/form/customer?lang=${i18n.language}`, 'POST', { ...form })
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div id='form' className='form-container'>
            <div className='form-content'>
                <h3>Reserve your lettuce</h3>
                <h4>We'll call soon, all in good hands!</h4>
                <div className='form'>
                    <div className='div-form'>
                        <ul className='errors'>
                            {loading ? <Preloader /> :
                                message && <li className='err'>{message}</li>}
                            {error && error.map((err, index) => (
                                <li className='err' key={index}>{err.msg}</li>
                            ))}

                        </ul>
                        <form onSubmit={sendHandler}>
                            <div className='form-group'>
                                <input
                                    placeholder='name'
                                    type='text'
                                    name='name'
                                    value={form.name}
                                    onChange={handleInputChange}
                                    required
                                />

                                <input
                                    placeholder='phone'
                                    type='text'
                                    value={form.phone}
                                    name='phone'
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className='mail'>
                                <input
                                    placeholder='mail'
                                    type='text'
                                    name='mail'
                                    value={form.mail}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className='textarea'>
                                <textarea
                                    placeholder='Text from you'
                                    value={form.text}
                                    name='text'
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className='form-send'>
                                <div class="checkbox">
                                    <input id="check2" type="checkbox" name="check" required/>
                                    <label for="check2">Consent process personal data</label>
                                </div>

                                <button
                                    className='leaf_button'
                                    disabled={loading}
                                >
                                    {loading ? t('Sending') : t('Send')}

                                </button>

                            </div>


                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateProduct;