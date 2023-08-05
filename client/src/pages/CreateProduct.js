import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHttp } from '../hooks/useHttpHook';
import Preloader from '../components/Preloader';

const CreateProduct = () => {
  const { t, i18n } = useTranslation();
  const { req, loading, error, message } = useHttp();
  const [formValues, setFormValues] = useState({
    csTitle: '',
    csDescription: '',
    enTitle: '',
    enDescription: '',
    ukTitle: '',
    ukDescription: '',
    ruTitle: '',
    ruDescription: '',
    photo: null,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handlePhotoChange = (event) => {
    setFormValues((prevValues) => ({ ...prevValues, photo: event.target.files[0] }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
 
    try {
      const formData = new FormData();
      formData.append('cs[title]', formValues.csTitle);
      formData.append('cs[description]', formValues.csDescription);
      formData.append('en[title]', formValues.enTitle);
      formData.append('en[description]', formValues.enDescription);
      formData.append('uk[title]', formValues.ukTitle);
      formData.append('uk[description]', formValues.ukDescription);
      formData.append('ru[title]', formValues.ruTitle);
      formData.append('ru[description]', formValues.ruDescription);
      formData.append('photo', formValues.photo);
      const result = await req(`/api/product/create?lang=${i18n.language}`, 'POST', formData);

      // Handle success response, e.g., show a success message
      console.log(result);
    } catch (error) {
      // Handle error, e.g., display error message
      console.error(error);
    }
  };

  return (
    <div>

      <h1>{('createProduct')}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>{t('csTitle')}</label>
          <input
            type="text"
            name="csTitle"
            value={formValues.csTitle}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>{t('csDescription')}</label>
          <textarea
            name="csDescription"
            value={formValues.csDescription}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>{t('enTitle')}</label>
          <input
            type="text"
            name="enTitle"
            value={formValues.enTitle}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>{t('enDescription')}</label>
          <textarea
            name="enDescription"
            value={formValues.enDescription}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>{t('ukTitle')}</label>
          <input
            type="text"
            name="ukTitle"
            value={formValues.ukTitle}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>{t('ukDescription')}</label>
          <textarea
            name="ukDescription"
            value={formValues.ukDescription}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>{t('ruTitle')}</label>
          <input
            type="text"
            name="ruTitle"
            value={formValues.ruTitle}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>{t('ruDescription')}</label>
          <textarea
            name="ruDescription"
            value={formValues.ruDescription}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>{t('photo')}</label>
          <input type="file" name="photo" accept="image/jpeg, image/png" onChange={handlePhotoChange} required/>
        </div>
        <button type="submit" disabled={loading}>
          {loading ? t('creatingProduct') : t('createProduct')}
        </button>
        {loading ? <Preloader /> :
                    message && <li className='err'>{message}</li>}
                {error && error.errors.map((err, index) => (
                    <li className='err' key={index}>{err.msg}</li>
                ))}        {/* {message && <div>{message}</div>} */}
      </form>
    </div>
  );
};

export default CreateProduct;