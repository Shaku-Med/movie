import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import Signup from './Signup'

function Auth() {

    const [state, setstate] = useState({ 
        login: true,
        signup: false
    })

    useEffect(() => { 
    }, [])


  return (
    <div>
      <Signup/>
    </div>
  )
}

export default Auth
