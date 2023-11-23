import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Form, InputGroup, FormText } from "react-bootstrap";
import {v4 as uuid} from 'uuid'
import axios from 'axios'
import {Helmet} from "react-helmet";


function Signup({socket}) {
    const [uname, setuname] = useState('')
    const [email, setemail] = useState('')
    const [pass, setpass] = useState('')

    const [token, settoken] = useState('')

    const [err, seterr] = useState('')

    const [as, setas] = useState(0)


  useEffect(() => {

    axios.post("https://vtube.mohamedbrima.repl.co/session/key", { 
      keys: uuid()
    }).then(res =>{ 
      if(res.data.success === "success"){ 
        settoken(res.data.tokens)
      }
    })

     //Mouse movements...
     let side_part = document.querySelector(".side_part")
     side_part.addEventListener('pointermove', e => { 
        let clients = side_part.getBoundingClientRect()
        let x = - e.clientX
        let y = - e.clientY

        side_part.style.backgroundPositionY = .3 * y * clients.width / 30000 + "px"
     })
  }, []);

  const handle_signup  = e => { 
    e.preventDefault()

    let unamergx = /^[a-zA-Z ]+$/

    let emailregix = /^[a-z0-9](\.?[a-z0-9]){5,}@g(oogle)?mail\.com$/

    let passregix = /^(?=.*[0-9])(?=.*[!@?#$%^&*])[a-zA-Z0-9!@?#$%^&*]{6,16}$/;

    let unames = document.getElementById("user")
    let emails = document.getElementById("email")
    let passes = document.getElementById("pass")

    if(uname === ""){ 
        seterr("Error: enter your name")
    }
    else if(uname.length < 5){ 
        seterr("Error: Invalid Name")
        unames.focus()
    }
    else if(uname.split(' ').length < 2){ 
        seterr("Error: Name is invalid...")
        unames.focus()
    }
    else if(!uname.match(unamergx)){ 
        seterr("Error: Unauthorized Name...")
        unames.focus()
    }
    else if(uname !== uname.split('  ')[0]){ 
        seterr("Error: Single Space please.")
        unames.focus()
    }
    else if(email === ""){ 
        seterr("Error: enter your email...")
        emails.focus()
    }
    else if(email.length < 5){ 
        seterr("Error: Invalid email length...")
        emails.focus()
    }
    else if(!email.match(emailregix)){ 
        seterr("Error: Unauthorized Email... Use @gmail.com as the domain.")
        emails.focus()
    }
    else if(pass === ""){ 
        seterr("Error: enter your password.")
        passes.focus()
    }
    else if(pass.length < 10){ 
        seterr("Error: Your password length must be 10 character, letters, numbers and symbols")
        passes.focus()
    }
    else if(!pass.match(passregix)){ 
        seterr("Error: your password doesn't go with our requirement.")
        passes.focus()
    }
    else if(token === ''){ 
        seterr("Error: Please reload... Your token expired...")
        passes.focus()
    }
    else { 
        seterr("")
        let checking_information = document.querySelector(".checking_information")
        checking_information.classList.add("show_ers")

        let datas = { 
          usernames: uname,
          email: email,
          pass: pass,
          c_usr: uuid(),
          pageid: uuid(),
          profilepic: 'https://static.rfstat.com/renderforest/images/v2/icons/profile-tumb-1.png',
          coverpic: "",
          xs: uuid(),
          bagpo: "0",
        }

        socket.emit("storedtoken", token)

        axios.post("https://vtube.mohamedbrima.repl.co/vivid", datas).then(res => { 
          if(res.data.success === "success"){ 
            sessionStorage.clear()
          }
          else { 
            seterr("Error:" + res.data.success)

            axios.post("https://vtube.mohamedbrima.repl.co/session/key", { 
              keys: uuid()
            }).then(res =>{ 
              if(res.data.success === "success"){ 
                settoken(res.data.tokens)
              }
            })

            setTimeout(() => {
              checking_information.classList.remove("show_ers")
            }, 2000);
          }
        })


    }
    

  }


  return (
    <>

      <Helmet>
        <title>vTube | Sign up</title>
      </Helmet>
     
        <div className="sign_ups">
      <div className="side_part">
        <div className="h1">Sign up</div>
      </div>
      <div className="nump">
        <form onSubmit={handle_signup} action="">
          <div className="user_logos">
            <img
              src="../favicon.ico"
              alt=""
            />
            <div className="txts text-center">
              <div className="h1">Hey There.</div>
              <small>
                Anything you type here will be sent in a secured way. create
                your account.
              </small>
            </div>
          </div>
          <br />
          <div className="error_report text-center text-danger">
            <div className="ers">{err}</div>
          </div>
          <br />
          <div className="form_datas">
            <div className="col">
              <input autoFocus onChange={e => setuname(e.target.value)} onPaste={e => e.preventDefault()} type="text" placeholder="Username" id="user" />
              <i id="hover_tme" className="fa fa-exclamation-circle"></i>
              <div className="hov_txts">
                Your username must be your FulName. This user name will be used
                through out this website and will be seen by everyone on this
                platform. (Pasting is denied.)
              </div>
            </div>
            <div className="col">
              <input onChange={e => setemail(e.target.value)} onPaste={e => e.preventDefault()} type="email" placeholder="email@gmail.com" id="email" />
              <div className="hoveremail">
                Your email address must only be gmail. e.g @gmail.com. your
                email address will only be visible to you. (Pasting is denied.)
              </div>
            </div>
            <div className="col">
              <input onChange={e => setpass(e.target.value)} onPaste={e => e.preventDefault()} type="password" placeholder="password***" id="pass" />
              <i onClick={e => { 
                let eye = document.getElementById("eye")
                let passss = document.getElementById("pass")
                if(as === 0){ 
                  passss.type = "text"
                  eye.setAttribute("class", "fa fa-eye-slash")
                  setas(1)
                }
                else { 
                  passss.type = "password"
                  eye.setAttribute("class", "fa fa-eye")
                  setas(0)
                }
              }} className="fa fa-eye" id="eye"></i>

              <div className="hovpass">
                You must enter a secured password to complete your account
                creating. Your password must contain letters, numbers and
                symbols. e.g | @11password@secured?. (Pasting is denied.)
              </div>
            </div>
            <div className="col">
              <button className="btn btn-outline-dark w-100">Sign up</button>
            </div>
            <div className="col text-center">
              <b>Already have an account? </b>
              <span onClick={e => { 
               sessionStorage.clear()
              }} className="text-primary" style={{ cursor: "pointer" }}>
                Login.
              </span>
            </div>
          </div>
        </form>
        <div className="checking_information">
        <img onError={e => { 
              alert("Unable to load image.")
            }} style={{width: "2rem", marginTop: 100}} src="https://media.tenor.com/On7kvXhzml4AAAAj/loading-gif.gif" alt="" />
            <div className="status_message">{err}</div>
        </div> 
      </div>
    </div>
    </>
  );
}

export default Signup;
