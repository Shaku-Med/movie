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

   console.log(timer)
  }, [])

  return (
    <>
    { 
      [state].map((val, key) => { 
       if(val.preloader === true){ 
        return ( 
          <div key={key}></div>
        )
       }
       else { 
        if(val.frame === true){ 
          return ( 
            <div key={key}>
              Invalid route
            </div>
          )
        }
        else { 
          if(val.login === true){ 
            return ( 
              <Auth key={key}/>
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
