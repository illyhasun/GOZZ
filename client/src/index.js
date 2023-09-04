import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Preloader from './components/Preloader';


import './i18n'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <React.Suspense fallback={<Preloader />}>
      <App />
    </React.Suspense>
  </React.StrictMode>
);