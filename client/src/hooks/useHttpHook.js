// import { useCallback, useState } from 'react'

// export const useHttp = () => {

//     const [loading, setLoading] = useState()
//     const [error, setError] = useState()
//     const [message, setMessage] = useState()


//     // юзКолБек щоб не було рекурсії
//     const req = useCallback(async(url, method = 'GET', body = null, headers = {}) => {
//         setLoading(true)
//         try{
//             if(body){
//                 body = JSON.stringify(body)
//                 headers['Content-Type'] = 'application/json'
//             }

//             const res = await fetch(url, {method, body, headers})
//             const data = await res.json()

            
//             if(!res.ok){
//                 setError(data.errors)
//                 setMessage(data.message)
//                 throw new Error(data.message || 'Somth gone wrong..')
//             }

//             setLoading(false)
//             setError([])
//             setMessage(data.message)

//             return data

//         }catch(e){
//             setLoading(false)
//             throw e 
//         }
//     }, [])

//     return {loading, req, error, message}


// }
import { useCallback, useState } from 'react';

export const useHttp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');

  const req = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
    setLoading(true);
    try {
      if (body) {
        if (!(body instanceof FormData)) {
          body = JSON.stringify(body);
          headers['Content-Type'] = 'application/json';
        }
      }

      const res = await fetch(url, { method, body, headers });
      const data = await res.json();

      if (!res.ok) {
        setError(data.errors);
        setMessage(data.message);
        throw new Error(data.message || 'Something went wrong..');
      }

      setLoading(false);
      setError(null);
      setMessage(data.message);

      return data;
    } catch (e) {
      setLoading(false);
      throw e;
    }
  }, []);

  return { loading, req, error, message };
};