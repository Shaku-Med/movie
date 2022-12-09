import Cookies from 'js-cookie'
import React, { useContext, useEffect, useState } from 'react'
import { Connection } from '../Connection'

function Nav() {

    const {owner, setowner} = useContext(Connection)

  return (
    <>
      { 
       [owner].map((val, key) => { 
        if(val !== ""){ 
            return ( 
                <div key={key} style={{WebkitUserSelect: 'none', userSelect: 'none'}} className="nav_o shadow">
                <div className="nav_main">
                    <div  className="nav_1">
                        <div onClick={e => { 
                            window.open("../#/", "_self")
                        }} className="logo_1">
                            <img style={{pointerEvents: 'none'}} src="https://musicbackend.mohamedbrima.repl.co/Images/logo_free-file.png" alt="" />
                        </div>
                    </div>
                    <div className="nav_m_1">
                        <div onClick={e => { 
                            window.open("../#/Account", "_self")
                        }} className="navs_1">
                            <i className="fa fa-bank"></i>
                            <span>Account</span>
                        </div>
                        <div  onClick={e => { 
                            window.open("../#/Lib", "_self")
                        }}  className="navs_1">
                            <i className="fa fa-book"></i>
                            <span>Library</span>
                        </div>
                        <div className="active_state"></div>
                    </div>
                    <div className="user_part_">
                        <div className="part_up">
                          <a href="../#/Upload">
                            <i className="fa-solid fa-video"></i>
                          </a>
                        </div>
                        <div className="part_l">
                            <div onClick={e => { 
                                let drop_d = document.querySelector(".drop_d")
                                drop_d.classList.add("dropdowns")
                                document.addEventListener("pointerdown", e => { 
                                    if(e.target.id !== "drop_d"){ 
                                        drop_d.classList.remove("dropdowns")
                                    }
                                })
                            }} id="drop_d" className="img_first">
                                <img style={{width: '2.5rem', height: '2.5rem'}} onError={e => { 
                                    e.target.src = "https://www.beds4backs.com.au/wp-content/uploads/2020/07/no-image-406x406.jpg"
                                }} src={val.profilepic === "" ? "https://www.beds4backs.com.au/wp-content/uploads/2020/07/no-image-406x406.jpg": val.profilepic} alt="" />
                            </div>
                            <div className="drop_d">
                                <a href={"../#/User/" + val.pageid}>
                                    <div className="actions_1">
                                        <i className="fa fa-user"></i>
                                        <span>Profile page</span>
                                    </div>
                                </a>
            
                                <a href="../#/Account">
                                    <div className="actions_1">
                                        <i className="fa fa-bank"></i>
                                        <span>Account</span>
                                    </div>
                                </a>
            
                                <div onClick={e => { 
                                    if(window.confirm("Hi, You just clicked on logout button, Do you wish to logout?") === true){ 
                                        localStorage.clear()
                                        sessionStorage.clear()
                                        Cookies.remove("c_usr")
                                        Cookies.remove("xs")
                                    }
                                }} className="actions_1 logouts">
                                    <i className="fa fa-door-open"></i>
                                    <span>Logout.</span>
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

export default Nav
