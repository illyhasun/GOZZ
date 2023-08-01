import React, { useContext, useState } from 'react'

import { useHttp } from '../hooks/useHttpHook'
import { AuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom';


export default function Auth() {

  const navigate = useNavigate();

  const auth = useContext(AuthContext)

  const { loading, req, error, message } = useHttp()
  const [form, setForm] = useState({ username: '', password: '' })

  const changeHandler = e => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const registerHandler = async () => {
    try {
      const data = await req('/api/auth/register', 'POST', { ...form });
      auth.login(data.token, data.userId, data.roles);
      navigate('/');
    } catch (e) {}
  };
  
  const loginHandler = async () => {
    try {
      const data = await req('/api/auth/login', 'POST', { ...form });
      auth.login(data.token, data.userId, data.roles);
      navigate('/');
    } catch (e) {}
  };
  return (
    <div className='container'>
      <div className='center-div'>
        <h1>Авторизація</h1>

        <ul>
          <ul>
            {message && <li className='err'>{message}</li>}
            {error && error.map((err, index) => (
              <li className='err' key={index}>{err.msg}</li>
            ))}
          </ul>
        </ul>


        <div>
          <input
            placeholder='username'
            type='text'
            id='username'
            value={form.username}
            name='username'
            onChange={changeHandler}
          />
          <input
            placeholder='password'
            type='password'
            id='password'
            value={form.password}
            name='password'
            onChange={changeHandler}
          />

          <div className='buttons'>
            <button
              className='main-button'
            onClick={loginHandler}
            disabled={loading}
            >
              Ввійти
            </button>
            <button
              className='classic-button'
            onClick={registerHandler}
            disabled={loading}
            >
              Зареєструватися
            </button>

          </div>
        </div>
      </div>
    </div>
  )
}
