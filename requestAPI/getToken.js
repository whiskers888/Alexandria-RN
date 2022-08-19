import React, {useState, useEffect} from 'react';

// export const fetchToken = ()=> {
//   const [token, setToken] = useState('')

//   let URL = 'https://test.mmis.ru/api/tokenauth'
//   fetch(URL, {
//       method:'POST',
//       headers:{
//         Accept: 'application/json',
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({
//         'userName':'student',
//         'password':'testMe'
//       })
//   }).then(res => res.json()).then(res => {
//       console.log(res)
//       setToken(res.data.accessToken)
//       console.log(token)
//   })
// }

function useToken(username,password) {
  const [token, setToken] = useState('');

  let URL = 'https://test.mmis.ru/api/tokenauth'
  fetch(URL, {
      method:'POST',
      headers:{
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'userName':username,
        'password':password
      })
  }).then(res => res.json()).then(res => {
    if (res.data.accessToken !== null && res.state == '1') {
      setToken(res.data.accessToken)
    } else{
      console.log('GOT ERROR OR EMPTY RESULT')
      setToken('-1')
    }
  }
  )

  return token
}

