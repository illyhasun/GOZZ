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
    <div className='create-container'>

      <h3>Створити Продукт</h3>
      {loading ? <Preloader /> :
          message && <li className='message'>{message}</li>}
        {error && error.errors.map((err, index) => (
          <li className='err' key={index}>{err.msg}</li>
        ))}   
      <form onSubmit={handleSubmit}>
        <div className='inputs'>
          <div>
          <label>Чеська мова</label>
            <input
              placeholder='Назва салату'
              type="text"
              name="csTitle"
              value={formValues.csTitle}
              onChange={handleInputChange}
              required
            />
            <textarea
              placeholder='Опис салату'

              name="csDescription"
              value={formValues.csDescription}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
          <label>Англійська мова</label>

            <input
              placeholder='Назва салату'
              type="text"
              name="enTitle"
              value={formValues.enTitle}
              onChange={handleInputChange}
              required
            />
            <textarea
              placeholder='Опис салату'

              name="enDescription"
              value={formValues.enDescription}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
          <label>Українська мова</label>
            <input
              placeholder='Назва салату'

              type="text"
              name="ukTitle"
              value={formValues.ukTitle}
              onChange={handleInputChange}
              required
            />

            <textarea
              placeholder='Опис салату'
              name="ukDescription"
              value={formValues.ukDescription}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
          <label>Російська мова</label>

            <input
              placeholder='Назва салату'

              type="text"
              name="ruTitle"
              value={formValues.ruTitle}
              onChange={handleInputChange}
              required
            />
            <textarea
              placeholder='Опис салату'

              name="ruDescription"
              value={formValues.ruDescription}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        <div className='send-product'>
          <input type="file" name="photo" accept="image/jpeg, image/png" onChange={handlePhotoChange} required />
          <button type="submit" disabled={loading} className='leaf_button'>
            {loading ? t('creatingProduct') : t('createProduct')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateProduct;