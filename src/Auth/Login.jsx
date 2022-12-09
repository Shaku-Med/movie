import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Form, InputGroup, FormText } from "react-bootstrap";
import {v4 as uuid} from 'uuid'
import axios from 'axios'
import Cookies from "js-cookie";
import {Helmet} from "react-helmet";


function Login({socket}) {
    const [uname, setuname] = useState('')
    const [email, setemail] = useState('')
    const [pass, setpass] = useState('')

    const [token, settoken] = useState('')

    const [err, seterr] = useState('')

    const [as, setas] = useState(0)

    let [dates, setdates] = useState('')

  useEffect(() => {

    axios.post("http://192.168.1.43:3002/session/key", { 
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

    //  Time counting...

    
    setInterval(() => {
      let da = new Date(),
      hour = da.getHours(),
      min = da.getMinutes()
      if(hour < 12){ 
        if(min < 10 && hour > 12){ 
          setdates(hour + ":" + "0" + min + " PM")
        }
        else if(min < 10 && hour < 12){ 
          setdates(hour + ":" + "0" + min + " AM")
        }
        else if(min > 10 && hour < 12){ 
          setdates(hour + ":" + min + " AM")
        }

        else if(min > 10 && hour > 12){ 
          setdates(hour + ":" + min + " PM")
        }
        
      }
      else if(hour >= 12) { 
        if(min < 10 && hour > 12){ 
          setdates(hour + ":" + "0" + min + " PM")
        }
        else if(min < 10 && hour < 12){ 
          setdates(hour + ":" + "0" + min + " AM")
        }
        else if(min > 10 && hour < 12){ 
          setdates(hour + ":" + min + " AM")
        }

        else if(min > 10 && hour > 12){ 
          setdates(hour + ":" + min + " PM")
        }
      }
      if(min < 10 && hour > 12){ 
        setdates(hour + ":" + "0" + min + " PM")
      }
      else if(min < 10 && hour < 12){ 
        setdates(hour + ":" + "0" + min + " AM")
      }
      else if(min > 10 && hour < 12){ 
        setdates(hour + ":" + min + " AM")
      }

      else if(min > 10 && hour > 12){ 
        setdates(hour + ":" + min + " PM")
      }
    }, 1000);
  }, []);

  const handle_signup  = e => { 
    e.preventDefault()

    let unamergx = /^[a-zA-Z ]+$/

    let emailregix = /^[a-z0-9](\.?[a-z0-9]){5,}@g(oogle)?mail\.com$/

    let passregix = /^(?=.*[0-9])(?=.*[!@?#$%^&*])[a-zA-Z0-9!@?#$%^&*]{6,16}$/;

    let unames = document.getElementById("user")
    let emails = document.getElementById("email")
    let passes = document.getElementById("pass")

    if(email === ""){ 
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
          email: email,
          pass: pass,
        }

        socket.emit("storedtoken", token)

        axios.post("http://192.168.1.43:3002/enter", datas).then(res => { 
          if(res.data.success === "success"){ 
            Cookies.set("c_usr", res.data.c_usr)
            Cookies.set("xs", res.data.xs)
            localStorage.setItem("c_usr", res.data.c_usr)
            setTimeout(() => {
              window.location.reload()
            }, 10);
          }
          else { 
            seterr("Error:" + res.data.success)

            axios.post("http://192.168.1.43:3002/session/key", { 
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
        <title>vTube | Login</title>
      </Helmet>
         <div className="sign_ups">
      <div className="side_part">
        <div className="h1">Login</div>
      </div>
      <div className="nump">
        <form onSubmit={handle_signup} action="">
          <div className="user_logos">
            <img
              src="https://musicbackend.mohamedbrima.repl.co/Images/logo_free-file.png"
              alt=""
            />
            <div className="txts text-center">
              <div className="h1">Welcome Again.</div>
              <small>
                Anything you type here will be sent in a secured way. Login. The time is <b>{dates}</b>
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
              <input autoFocus onChange={e => setemail(e.target.value)} onPaste={e => e.preventDefault()} type="email" placeholder="email@gmail.com" id="email" />
              <div className="hoveremail">
                Your email address must only be gmail. e.g @gmail.com. your
                email address will only be visible to you. (Pasting is denied.)
              </div>
            </div>
            <div className="col">
              <input onChange={e => setpass(e.target.value)} onPaste={e => e.preventDefault()} type="password" placeholder="password***" id="pass" />
              <i  onClick={e => { 
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
                Remember, If you missed your password 4 times. your account will be locked for 10 days.
              </div>
            </div>
            <div className="col">
              <button className="btn btn-outline-dark w-100">Login</button>
            </div>
            <div className="col text-center">
              <b>don't have an account? </b>
              <span onClick={e => { 
                sessionStorage.setItem("up", "good")
              }} className="text-primary" style={{ cursor: "pointer" }}>
                Signup.
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

export default Login;
