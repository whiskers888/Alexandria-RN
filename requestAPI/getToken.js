import React, {useState} from 'react';

export const fetchToken = ()=> {
  const [token, setToken] = useState('')

  let URL = 'https://test.mmis.ru/api/tokenauth'
  fetch(URL, {
      method:'POST',
      headers:{
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'userName':'student',
        'password':'testMe'
      })
  }).then(res => res.json()).then(res => {
      console.log(res)
      setToken(res.data.accessToken)
      console.log(token)
  })
}