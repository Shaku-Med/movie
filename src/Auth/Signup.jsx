import React from 'react'
import { GoogleLogin } from '@leecheuk/react-google-login';
import { useEffect } from 'react';

function Signup() {
    useEffect(() => { 
        console.log(process.env.REACT_APP_GOOGLE_API)
    }, [])
  return (
    <div>
        <h1>LOgin with google.</h1>
      <GoogleLogin
       onFailure={e => { 
        console.log("Authentication failed...")
       }}
       onSuccess={e => { 
        console.log(e)
        alert(e)
       }}
       clientId={process.env.REACT_APP_GOOGLE_API}
        />
    </div>
  )
}

export default Signup
