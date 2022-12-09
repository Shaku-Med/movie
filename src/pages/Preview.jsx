import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useParams } from "react-router-dom";
import { v4 as uuid } from "uuid";
import axios from "axios";
import Cookies from "js-cookie";

function Preview({socket}) {

   useEffect(() => { 
    setInterval(() => {
      let vids = document.getElementById("vids")
      vids.setAttribute('disablePictureInPicture', 'true')
      vids.setAttribute('controlsList', 'nodownload')
    }, 10);
   }, [])

   const {id} = useParams()



   const [token, settoken] = useState("");

   const [usr, setusr] = useState([]);
   const [vido, setvido] = useState([]);
 
   useEffect(() => {
     axios
       .post("https://vtube.mohamedbrima.repl.co/session/home", {
         keys: uuid(),
       })
       .then((res) => {
         if (res.data.success === "success") {
           socket.emit("homeus", res.data.tokens);
           axios
             .post("https://vtube.mohamedbrima.repl.co/all/users", {
               c_usr: Cookies.get("c_usr"),
               xs: Cookies.get("xs"),
             })
             .then((res) => {
               if (res.success !== "errs") {
                 setusr(res.data)
                 console.log(res.data)
                 axios
                   .post("https://vtube.mohamedbrima.repl.co/videos/private", {
                     c_usr: Cookies.get("c_usr"),
                     xs: Cookies.get("xs"),
                   })
                   .then((dat) => {
                     if (dat.data !== "errs") {
                       setvido(dat.data);
                     }
                   });
               }
             });
         }
       });


      

   }, [id]);
 


  return (
    <div>

     { 
         usr.map((v, k) => { 
          return ( 
            <div key={k}>
              { 
                 vido.map((val, key) => {
                  if(v.c_usr === val.ownerid){
                    if(val.vidid === id){ 
                      return ( 

                        <div key={key} className="video_part">
                        <i onClick={e => { 
                          let video = document.querySelector("video")
                          if(video.paused){ 
                            video.play()
                            e.target.setAttribute("class", "fa fa-pause")
                          }
                          else { 
                            video.pause()
                            e.target.setAttribute("class", "fa fa-play")
                          }
                        }} className="fa fa-play shadow" id="playbtn"></i>
                        <div className="container_main">
                          <video  id='vids' loop autoPlay disableRemotePlayback 
                           playsInline  src={val.videourl + "#t=1"}></video>
                           <div className="owner_pp">
                            <img style={{width: '3rem', height: '3rem'}} src={v.profilepic} alt="" />
                            <div className="own_tool">
                              <div className="h1">{val.vtxt}</div>
                              <Link to={"../User/" + v.pageid}>{v.usernames}</Link>
                            </div>
                           </div>
                        </div>
                      </div>

                      )
                    }
                  }
                }
                )
              }
            </div>
          )
         })
     }

    



      <div style={{width: '100%', display: "flex", alignItems: 'center', justifyContent: 'center', width: '100%'}}>
      <Helmet>
        <title>vTube</title>
      </Helmet>
              <div style={{width: '100%', display: "flex", alignItems: 'center', justifyContent: 'center', width: '100%'}} className="main_vid_grid">
                <div className="m_cont_h d-flex">
                  <div className="maing_grid">
      {
        usr.map((v, k) => { 
          return (
              <div key={k} className="grid_home_1">
                { 
                  vido.map((val, key) => {
                    if(v.c_usr === val.ownerid){ 
                      return (
                        <div key={key} className="grid_home_3" >
                          <div onClick={e => { 
                            let playbtn = document.getElementById("playbtn")
 
 
                            let video = document.querySelector("video")
                            if(video.paused){ 
                              video.play()
                             playbtn.setAttribute("class", "fa fa-pause")
                            }
                            else { 
                              video.pause()
                             playbtn.setAttribute("class", "fa fa-play")
                            }
                           window.open("../#/watch/" + val.vidid, "_self")
                           window.scrollTo({ top: 0, behavior: 'smooth' });


                          }} className="vid_conta">
                            <video onError={e => { 
                              e.target.src = "https://miro.medium.com/max/1400/0*K-ja6y4WYqIj64gO.jpg"
                            }} src={val.videourl + "#t=1"}></video>
                          </div>
                          <div className="owner_pic">
                            <div className="one_p">
                              <img
                                onError={(e) => {
                                  e.target.src =
                                    "https://www.beds4backs.com.au/wp-content/uploads/2020/07/no-image-406x406.jpg";
                                }}
                                src={v.profilepic}
                                alt=""
                              />
                            </div>
                            <div className="nav_e_sp">
                              <div className="vid_tie">
                                { 
                                  val.vtxt
                                }
                              </div>
                              <div className="v_owname">
                                <Link to={"../User/" + v.pageid}>{v.usernames}</Link>
                              </div>
                            </div>
                          </div>
                        </div>
                );
                     }
                   
                 })
                }
              </div>
            )
          })
        }
        </div>
      </div>
    </div>
    </div>

    </div>
  )
}

export default Preview
