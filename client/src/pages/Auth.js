import React, { useContext, useState } from 'react'

import { useHttp } from '../hooks/useHttpHook'
import { AuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom';


export default function Auth() {

  const navigate = useNavigate();

  const auth = useContext(AuthContext)

  const { loading, req, error } = useHttp()
  const [form, setForm] = useState({ username: '', password: '' })

  const changeHandler = event => {
    const { name, value } = event.target;
    setForm((prevValues) => ({ ...prevValues, [name]: value }));  }

  // const registerHandler = async () => {
  //   try {
  //     const data = await req('/api/auth/register', 'POST', { ...form });
  //     auth.login(data.token, data.userId, data.roles);
  //     navigate('/');
  //   } catch (e) { }
  // };

  const loginHandler = async (event) => {
    try {
      event.preventDefault();

      const data = await req('/api/auth/login', 'POST', { ...form });
      auth.login(data.token, data.userId);
      navigate('/');
    } catch (e) { }
  };
  return (
    <div className='auth-container'>
      <div className='auth-content'>
        <h3>Авторизація</h3>

        <ul>
          {error && error.map((err, index) => (
            <li className='err' key={index}>{err.msg}</li>
          ))}
        </ul>

        <form onSubmit={loginHandler}>
          <input
            placeholder='username'
            type='text'
            value={form.username}
            name='username'
            onChange={changeHandler}
          />
          <input
            placeholder='password'
            type='password'
            value={form.password}
            name='password'
            onChange={changeHandler}
          />

          <button
            type='submit'
            className='leaf_button'
            disabled={loading}
          >
            Ввійти
          </button>
        </form>
        {/* <button
              className='classic-button'
            onClick={registerHandler}
            disabled={loading}
            >
              Зареєструватися
            </button> */}
      </div>
    </div>
  )
}
