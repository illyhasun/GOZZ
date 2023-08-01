
import React, { useEffect, useState, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useHttp } from '../hooks/useHttpHook';
import Preloader from '../components/Preloader';
import { AuthContext } from '../context/AuthContext';


const lngs = {
  en: { nativeName: 'Engilsh' },
  cs: { nativeName: 'Čeština' },
  uk: { nativeName: 'Українська' },
  ru: { nativeName: 'Русский' },
}

function Catalog() {
  const { t, i18n } = useTranslation()
  const { req, loading } = useHttp();
  const [data, setData] = useState([]);

  const auth = useContext(AuthContext);

  const [selectedProduct, setSelectedProduct] = useState(null);


  const [selectedLanguage, setSelectedLanguage] = useState(i18n.resolvedLanguage);

  const deleteProduct = async (productId) => {
    try {
      const userId = JSON.parse(localStorage.getItem('userData')).userId;
      const confirmed = window.confirm("Are you sure you want to delete this product?");
      if (confirmed) {
        await req('/api/product/delete', 'DELETE', { id: productId }, { '_id': userId });
        setData((prevData) => prevData.filter((product) => product._id !== productId));
        setSelectedProduct(null); // Clear the selected product if it was deleted
      }
    } catch (error) {
      console.log(error);
    }
  };



  useEffect(() => {
    async function fetchData() {
      console.log(selectedLanguage)
      const result = await req(`/api/product/get?lang=${i18n.language}`);
      console.log(result)
      setData(result.products);
    }
    fetchData();
  }, [req, i18n.language]);
  console.log(selectedLanguage)


  return (

    <div className="App">
      <div>
        {Object.keys(lngs).map((lng) => (
          <button type='submit' key={lng} onClick={() => i18n.changeLanguage(lng)} disabled={i18n.resolvedLanguage === lng}>
            {lngs[lng].nativeName}
          </button>
        ))}
      </div>
      <h1>{t('work')}</h1>
      {loading ? ( // Render Preloader if the data is loading
        <Preloader />
      ) : (
        // Render the data once it's loaded
        data.map((product) => (
          <div key={product._id}>
            <img src={product.photo} alt={product[i18n.language]?.title} />
            <h1>{product[i18n.language]?.title}</h1>
            <h3>{product[i18n.language]?.description}</h3>
            {auth.isAuthenticated ? (
            <>
              <button onClick={() => deleteProduct(product._id)}>Delete</button>
            </>
          ) : null}
          </div>
        ))
        
      )}
    </div>
  );
}

export default Catalog;