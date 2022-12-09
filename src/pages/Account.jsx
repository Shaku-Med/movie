import axios from 'axios'
import Cookies from 'js-cookie'
import React, { useContext, useEffect, useState } from 'react'
import { Connection } from '../Connection'
import {v4 as uuid} from 'uuid'
import {Helmet} from 'react-helmet'
function Account({socket}) {

  const {owner, setowner} = useContext(Connection)

  const [name, setname] = useState('')
  const [bio, setbio] = useState('')

  return (
   <>
     { 
       [owner].map((val, key) => { 
        if(val !== ""){ 
          return ( 
            <div key={key}>

<Helmet>
        <title> vTube | Edit Your account | {val.usernames.split(' ')[0]}</title>
      </Helmet>

              <div className="text-center h1">Account Setting</div>
     <div className="griding_items">
      <div className="g_main">
        <div className="g_1">
        <img onError={e => { 
                                    e.target.src = "https://www.beds4backs.com.au/wp-content/uploads/2020/07/no-image-406x406.jpg"
                                }} src={val.profilepic === "" ? "https://www.beds4backs.com.au/wp-content/uploads/2020/07/no-image-406x406.jpg": val.profilepic} alt="" />
          <div className="persons_name h1 text-center">{val.usernames}</div>
        </div>
        <div className="g_2">
          <div className="see_c">
            <div onClick={e => { 
              let name = document.querySelector(".name")
              name.classList.add("n")
            }} className="show_this">
              Change username
            </div>
            <div className="main_show name">
               <input onChange={e => { 
                setname(e.target.value)
               }} type="text" name="" placeholder={val.usernames} id="" />
               <button onClick={e => { 
                e.preventDefault()
                let unamergx = /^[a-zA-Z ]+$/


                 if(name === ""){ 
                  alert("Error: enter your name")
              }
              else if(name.length < 5){ 
                  alert("Error: Invalid Name")
              }
              else if(name.split(' ').length < 2){ 
                  alert("Error: Name is invalid...")
              }
              else if(!name.match(unamergx)){ 
                  alert("Error: Unauthorized Name...")
              }
              else if(name !== name.split('  ')[0]){ 
                  alert("Error: Single Space please.")
              }
              else { 

                axios.post("https://vtube.mohamedbrima.repl.co/session/key", { 
                  keys: uuid()
                }).then(res =>{ 
                  if(res.data.success === "success"){ 
                    socket.emit("storedtoken", res.data.tokens)
                    axios.post("https://vtube.mohamedbrima.repl.co/user/update", { 
                      c_usr: Cookies.get("c_usr"),
                      xs: Cookies.get("xs"),
                      newname: name
                    }).then(res => { 
                     if(res.data.success === "success"){ 
                      window.location.reload()
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
                
              }
               }} className="btn btn-outline-primary">Done</button>
            </div>
          </div>

          <div className="see_c">
            <div
             onClick={e => { 
              let bios = document.querySelector(".bios")
              bios.classList.add("b")
            }}
             className="show_this">
             Add a bio
            </div>
            <div className="main_show bios">
              <textarea onChange={e => { 
                setbio(e.target.value)
               }} name="" id="" placeholder={val.bios === '' ? "No bio added" : val.bios} ></textarea>
               <button onClick={e => { 
                e.preventDefault()

              if(bio === ""){ 
                  alert("Error: enter your bio")
              }
              else if(bio.length < 10){ 
                  alert("Error: 20 words required.")
              }
              else if(bio.split(' ').length < 20){ 
                  alert("Error: 20 words required")
              }
              else if(bio !== bio.split('  ')[0]){ 
                  alert("Error: Single Space please.")
              }
              else { 

                axios.post("https://vtube.mohamedbrima.repl.co/session/key", { 
                  keys: uuid()
                }).then(res =>{ 
                  if(res.data.success === "success"){ 
                    socket.emit("storedtoken", res.data.tokens)
                    axios.post("https://vtube.mohamedbrima.repl.co/user/bio", { 
                      c_usr: Cookies.get("c_usr"),
                      xs: Cookies.get("xs"),
                      newname: bio
                    }).then(res => { 
                     if(res.data.success === "success"){ 
                      window.location.reload()
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
                
              }
               }} className="btn btn-outline-primary">Done</button>
            </div>
          </div>

         <div className="b d-flex">
         <div onClick={e => { 
          window.open("../#/User/" + val.pageid, "_self")
         }} className="see_c">
            <button className="btn btn-outline-warning">Change pictures.</button>
          </div>

          <div onClick={e => { 
            if(window.confirm("You're about to logout of all the device this account is connected to immediately. Do you wish to take this action?") === true){ 

              axios.post("https://vtube.mohamedbrima.repl.co/session/key", { 
                  keys: uuid()
                }).then(res =>{ 
                  if(res.data.success === "success"){ 
                    socket.emit("storedtoken", res.data.tokens)
                    socket.emit("logout", { 
                      c_usr: Cookies.get("c_usr"),
                      xs: Cookies.get("xs")
                    })
                  }
                })

            }
          }} className="see_c">
            <button className="btn btn-outline-danger">Log off all</button>
          </div>

         </div>
        </div>
      </div>
     </div>
            </div>
          )
        }
       })
     }
   </>
  )
}

export default Account