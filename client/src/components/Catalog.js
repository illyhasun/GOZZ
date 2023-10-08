
import React, { useEffect, useState, useContext, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useHttp } from '../hooks/useHttpHook';
import Preloader from '../components/Preloader';
import { AuthContext } from '../context/AuthContext';

function Catalog() {
  const { t, i18n } = useTranslation()
  const { req, loading } = useHttp();
  const [data, setData] = useState([]);
  const catalogRef = useRef(null)


  const auth = useContext(AuthContext);
  const [visibleProducts, setVisibleProducts] = useState(6);
  const [showLessButton, setShowLessButton] = useState(false);
  const [arrowRotated, setArrowRotated] = useState(false);

  const [selectedProductWindow, setSelectedProductWindow] = useState(null);
  const [isDetailWindowOpen, setIsDetailWindowOpen] = useState(false);

  const ReserveCabbage = (e, target) => {
    e.preventDefault();
    const element = document.getElementById(target);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    closeDetailWindow()
  };


  useEffect(() => {
    if(!arrowRotated){
      const updateVisibleProductsPerRow = () => {
        setVisibleProducts(window.innerWidth < 600 ? 3 : (window.innerWidth < 1000 ? 4 : 6));
      };
      updateVisibleProductsPerRow();
      window.addEventListener('resize', updateVisibleProductsPerRow);
      return () => window.removeEventListener('resize', updateVisibleProductsPerRow);
    }
  }, [arrowRotated]);

  const handleProductClick = (product) => {
    if (product) {
      setSelectedProductWindow(product);
      setIsDetailWindowOpen(true);
    }
  };
  const closeDetailWindow = () => {
    setSelectedProductWindow(null);
    setIsDetailWindowOpen(false);
  };

  const deleteProduct = async (productId) => {
    try {
      const userId = JSON.parse(localStorage.getItem('userData')).userId;
      const confirmed = window.confirm("Are you sure you want to delete this product?");
      if (confirmed) {
        await req('/api/product/delete', 'DELETE', { id: productId }, { '_id': userId });
        setData((prevData) => prevData.filter((product) => product._id !== productId));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const showAllProducts = () => {
    setVisibleProducts(data.length);
    setShowLessButton(true);
    setArrowRotated(true);
  };

  const showLessProducts = () => {
    setVisibleProducts(window.innerWidth < 600 ? 3 : (window.innerWidth < 1000 ? 4 : 6));
    setShowLessButton(false)
    setArrowRotated(false)
  };

  useEffect(() => {
    async function fetchData() {
      const result = await req(`/api/product/get?lang=${i18n.language}`);
      setData(result.products);
    }
    fetchData();
  }, [req, i18n.language]);

  useEffect(() => {
    if (isDetailWindowOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isDetailWindowOpen]);

  return (
    <div id='catalog' ref={catalogRef} className='catalog-container'>
      <div className='catalog-text'>
        <h3>{t('catalogH3')}</h3>
        <h4>{t('catalogH4')}</h4>
      </div>
      <div className={`catalog ${isDetailWindowOpen ? 'catalog-detail-open' : ''}`}>
        {loading ? (
          <Preloader />
        ) : (

          data?.map((product, index) => (
            <div
              key={product._id}
              className={`products ${index >= visibleProducts ? 'hidden-product' : ''}`}
              style={{ transitionDelay: `${100}ms` }}
            >
              <img className='product-photo' 
              src={product.photo} 
              alt={product[i18n.language]?.title} 
              onClick={() => handleProductClick(product)}
              />
              <div className='product-text'>
                <h2 onClick={() => handleProductClick(product)}>{product[i18n.language]?.title}</h2>

                {auth.isAuthenticated ? (
                  <img onClick={() => deleteProduct(product._id)} src='/icons/trash.svg' alt='info' />
                ) : <img src='/icons/info.svg' alt='info' />}
              </div>
            </div>
          ))
        )
        }


        {((data.length > visibleProducts) || arrowRotated) && (
          <div className="show-more-button">
            <img
              className={showLessButton ? 'rotate-arrow' : 'rotated-arrow'}
              src='/images/arrow.svg'
              alt='more salad'
              onClick={showLessButton ? showLessProducts : showAllProducts}
            />

          </div>
        )}

        {isDetailWindowOpen && (
          <>
            <div className={isDetailWindowOpen ? "not-active-window detail-window-content" : "active-window window-container"}>
              <img src={selectedProductWindow?.photo} alt={selectedProductWindow?.title} />
              <div className='product-info'>
                <h2>{selectedProductWindow[i18n.language]?.title}</h2>
                <pre>{selectedProductWindow[i18n.language]?.description}</pre>
                <img className='close' onClick={closeDetailWindow} src={window.innerWidth < 1030 ? '/icons/close.svg' : '/icons/close_green.svg'} alt='close' />
                <button className='leaf_button' onClick={(e) => ReserveCabbage(e, 'form')}>{t('DetailWindowButton')}</button>
              </div>
            </div>
            <div className={`window-overlay ${isDetailWindowOpen ? "active" : ""}`} onClick={() => closeDetailWindow(false)}></div>
          </>
        )}
      </div >
    </div>
  );
}

export default Catalog;