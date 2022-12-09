import { useState } from 'react';
import { useEffect } from 'react';
import Cookies from 'js-cookie'
import './App.css';
import Auth from './Auth/Auth';
import {Helmet} from "react-helmet";
import { Connection } from './Connection';
import Routiing from './Routiing';
import {HashRouter} from 'react-router-dom'
import Audio from './Audio/Audio';
import io from 'socket.io-client'
import Nav from './Nav/Nav';
import Owner from './Owner/Owner';

let socket = new io("http://192.168.1.43:3002")


function App() {

  const [videosound, setvideosound] = useState('')
  const [owner, setowner] = useState('')

  const [state, setstate] = useState({ 
    login: false,
    home: false,
    frame: true,
    preloader: true
  })

  useEffect(() => { 
    if(Cookies.get("c_usr") && localStorage.getItem("c_usr") && Cookies.get("xs")){ 
      if(Cookies.get("c_usr") !== null && localStorage.getItem("c_usr") !== null && Cookies.get("xs") !== null){ 
        if(Cookies.get("c_usr") === localStorage.getItem("c_usr")){ 
          socket.on("allconnected", data => { 
           if(data.success === "success"){ 
            if(data.c_usr === Cookies.get("c_usr") && data.xs === Cookies.get("xs")){ 
              localStorage.clear()
              sessionStorage.clear()
              Cookies.remove("c_usr")
              Cookies.remove("xs")
              window.location.reload()
            }
           }
          })
        }
      }
    }
  }, [])

  useEffect(() => { 

    let timer = Math.floor(Math.random() * 20000) - 10

   setTimeout(() => {
    if(window.top !== window.self){ 
      setstate({ 
        login: false,
        home: false,
        frame: true,
        preloader: false
      })
    }
    else { 
       setInterval(() => {
        if(Cookies.get("c_usr") && localStorage.getItem("c_usr") && Cookies.get("xs")){ 
          if(Cookies.get("c_usr") !== null && localStorage.getItem("c_usr") !== null && Cookies.get("xs") !== null){ 
            if(Cookies.get("c_usr") === localStorage.getItem("c_usr")){ 
              setstate({ 
                login: false,
                home: true,
                frame: false,
                preloader: false
              })
            }
            else { 
              setstate({ 
                login: true,
                home: false,
                frame: false,
                preloader: false
              })
            }
          }
          else { 
            setstate({ 
              login: true,
              home: false,
              frame: false,
              preloader: false
            })
          }
        }
        else {
          setstate({ 
            login: true,
            home: false,
            frame: false,
            preloader: false
          })
        }
       }, 10);
    }
   }, timer);

  }, [])

  return (
    <>
    { 
      [state].map((val, key) => { 
       if(val.preloader === true){ 

        setTimeout(() => {
          let body = document.querySelector("body")
          body.style.overflow = "hidden"
        });

        return ( 
          <div key={key} className="preloaders">

        <Helmet>
                <title>vTube | Loading...</title>
              </Helmet>

            <img onError={e => { 
              alert("Unable to load image.")
            }} src="https://musicbackend.mohamedbrima.repl.co/Images/logo_free-file.png" alt="" />
            <div className="welcome h1">Welcome</div>
            <img onError={e => { 
              alert("Unable to load image.")
            }} style={{width: "2rem", marginTop: 100}} src="https://media.tenor.com/On7kvXhzml4AAAAj/loading-gif.gif" alt="" />
          </div>
        )
       }
       else { 
        if(val.frame === true){ 

          setTimeout(() => {
            let body = document.querySelector("body")
            body.style.overflow = "hidden"

            Cookies.remove("c_usr")
            localStorage.clear()

           document.addEventListener("keydown", e => { 
            if(e.ctrlKey && e.key){ 
              e.preventDefault()
            }
           })

           document.addEventListener("contextmenu", e => { 
            e.preventDefault()
           })

          });
          
          return ( 
            <div key={key}>
              <title>Access Denied.</title>
              <div key={key} className="preloaders w-100">
            <img onError={e => { 
              alert("Unable to load image.")
            }} src="https://musicbackend.mohamedbrima.repl.co/Images/logo_free-file.png" alt="" />
            <div className="welcome h1 text-center">Access Denied.</div>
          </div>
            </div>
          )
        }
        else { 
          if(val.login === true){ 

            setTimeout(() => {
              let body = document.querySelector("body")
              body.style.overflow = "hidden"
            });

            return ( 
              <Auth key={key}/>
            )
          }
          else { 


            setTimeout(() => {
              let body = document.querySelector("body")
              body.style.overflow = "auto"
              body.style.overflowX = "hidden"
            });

            return ( 
              <Connection.Provider key={key} value={{videosound, setvideosound, owner, setowner}}>
               <HashRouter>
                  <Owner socket={socket}/>
                  <Nav socket={socket}/>
                  <Routiing/>
               </HashRouter>
            </Connection.Provider>
            )
          }
        }
       }
      })
    }
    </>
  );
}

export default App;
