import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHttp } from './hooks/useHttpHook';
import Preloader from './components/Preloader';


const lngs = {
  en: { nativeName: 'Engilsh' },
  cs: { nativeName: 'Čeština' },
  uk: { nativeName: 'Українська' },
  ru: { nativeName: 'Русский' },
}

function App() {
  const { t, i18n } = useTranslation()
  const { req, loading } = useHttp();
  const [data, setData] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.resolvedLanguage);


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
          </div>
        ))
      )}
    </div>
  );
}

export default App;