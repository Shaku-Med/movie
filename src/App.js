import { useState } from 'react';
import { useEffect } from 'react';
import Cookies from 'js-cookie'
import './App.css';
import Auth from './Auth/Auth';

function App() {

  const [state, setstate] = useState({ 
    login: false,
    home: false,
    frame: true,
    preloader: true
  })

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
        if(Cookies.get("c_usr") && localStorage.getItem("c_usr")){ 
          if(Cookies.get("c_usr") !== null && localStorage.getItem("c_usr") !== null){ 
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
          });
          
          return ( 
            <div key={key}>
              <div key={key} className="preloaders w-100">
            <img onError={e => { 
              alert("Unable to load image.")
            }} src="https://musicbackend.mohamedbrima.repl.co/Images/logo_free-file.png" alt="" />
            <div className="welcome h1 text-center">Invalid Route...</div>
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
          }
        }
       }
      })
    }
    </>
  );
}

export default App;
