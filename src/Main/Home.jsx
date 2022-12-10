import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { v4 as uuid } from "uuid";
import axios from "axios";
import Cookies from "js-cookie";

function Home({ socket }) {
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
  }, []);

  return (
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
                                window.open("../#/watch/" + val.vidid, "_self")
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
  );
}

export default Home;
