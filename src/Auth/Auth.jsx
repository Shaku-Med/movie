import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import Login from './Login'
import Signup from './Signup'

import io from 'socket.io-client'

let socket = new io("https://s4qtq5-3002.csb.app")

function Auth() {

    const [state, setstate] = useState({ 
        login: true,
        signup: false
    })

    useEffect(() => { 
      if(sessionStorage.getItem('up')){ 
        if(sessionStorage.getItem("up") !== null){ 
          setstate({ 
            login: false,
            signup: true
          })
        }
        else { 
          setstate({ 
            login: true,
            signup: false
          })
        }
      }
      else { 
        setstate({ 
          login: true,
          signup: false
        })
      }
    }, [sessionStorage.getItem('up')])

  return (
    <>
      { 
        [state].map((val, key) => { 
          if(val.login === true){ 
            return ( 
              <Login socket={socket} key={key}/>
            )
          }
          else if(val.signup === true){ 
            return ( 
              <Signup socket={socket} key={key}/>
            )
          }
        })
      }
    </>
  )
}

export default Auth
