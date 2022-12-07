import React from 'react'
import { GoogleLogin } from '@leecheuk/react-google-login';

function Signup() {
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
       clientId='265214283441-icvcsrmd994bedofe397f6rcrt097i1o.apps.googleusercontent.com' />
    </div>
  )
}

export default Signup
