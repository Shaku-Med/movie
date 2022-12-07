import React from 'react'
import { GoogleLogin } from '@leecheuk/react-google-login';
import { useEffect } from 'react';

function Signup() {
    useEffect(() => { 
    }, [])
  return (
    <div>

<div id="g_id_onload"
         data-client_id="622326318804-l20465rf0cpuvf64vgfu6h21rh0cu6mf.apps.googleusercontent.com"
         data-callback="handleCredentialResponse">
    </div>

        <h1>LOgin with google.</h1>
      <GoogleLogin
       clientId={"704859039807-5u62qbrh11i5rq4bfgf62s93rq3skre0.apps.googleusercontent.com"}
       buttonText="Log in with Google"
       onSuccess={e => { 
        console.log(e)
       }}
       onFailure={e => { 
        console.log(e)
       }}
       cookiePolicy={'single_host_origin'}
        />
    </div>
  )
}

export default Signup
