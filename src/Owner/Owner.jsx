import axios from 'axios'
import Cookies from 'js-cookie'
import React, { useContext, useEffect, useState } from 'react'
import { Connection } from '../Connection'
import {v4 as uuid} from 'uuid'

function Owner({socket}) {

    const {owner, setowner} = useContext(Connection)

    const [state, setstate] = useState('')

    useEffect(() => { 

        axios.post("http://192.168.1.43:3002/session/key", { 
            keys: uuid()
          }).then(res =>{ 
            if(res.data.success === "success"){ 
                socket.emit("storedtoken", res.data.tokens)
                    axios.post("http://192.168.1.43:3002/trash/trust", { 
                        c_usr: Cookies.get("c_usr"),
                        xs: Cookies.get("xs")
                    }).then(res => { 
                        if(res.data.success !== "intruder"){ 
                            res.data.map(val => { 
                                setowner(val)
                            })
                            setstate("good")
                        }
                        else { 
                            localStorage.clear()
                            sessionStorage.clear()
                            Cookies.remove("c_usr")
                            Cookies.remove("xs")
                        }
                    })
            }
          })

        // 

    }, [])

  return (
    <>
      { 
        state === '' ? 
            <div className="maindiv">
                <div className="pvdiv">
                    <div className="h1">Loading....</div>
                </div>
            </div>
        :
        <div style={{display: "none"}}></div>

      }
    </>
  )
}

export default Owner
