import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import Login from './Login'
import Signup from './Signup'

import io from 'socket.io-client'

let socket = new io("http://192.168.1.43:3002")

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
