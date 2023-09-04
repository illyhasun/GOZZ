import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import { useAuth } from './hooks/authHook';
import useRoutes from './routes';
import Preloader from './components/Preloader';

function App() {
  const { token, login, logout, userId, ready } = useAuth();
  const isAuthenticated = !!token;
  const routes = useRoutes(isAuthenticated);

  if (!ready) {
    return <Preloader />;
  }

  return (
    <BrowserRouter>
      <AuthContext.Provider
        value={{ token, login, logout, userId, isAuthenticated }}
      >
        {routes}
      </AuthContext.Provider>
    </BrowserRouter>
  );
}

export default App;