import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext'; 

export default function Header() {
    const auth = useContext(AuthContext);
    const navigate = useNavigate();
    const handleLogout = (e) => {
      e.preventDefault();
      auth.logout();
      navigate('/');
    };
    return (
        <header>
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          {!auth.isAuthenticated && (
            <li>
              <NavLink to="/auth">auth</NavLink>
            </li>
          )}
          {auth.isAuthenticated && (
            <>
                <li>
                  <NavLink to="/create">Create</NavLink>
                </li>
              <li>
                <a href="/" onClick={handleLogout}>
                  Logout
                </a>
              </li>
            </>
          )}
        </ul>
      </header>
    );
}