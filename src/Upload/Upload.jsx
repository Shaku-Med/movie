import React, { useContext, useEffect, useState } from "react";
import { Connection } from "../Connection";
import VideoSnapshot from 'video-snapshot';
import axios from "axios";
import {v4 as uuid} from 'uuid'
import Cookies from "js-cookie";

function Upload({socket}) {
  const { owner, setowner } = useContext(Connection);

  const [myfile, setmyfile] = useState('')
  const [mytitle, setmytitle] = useState('')
  const [tokens, settoken] = useState('')

  useEffect(() => { 
    axios.post("https://vtube.mohamedbrima.repl.co/session/kay", { 
        keys: uuid()
      }).then(res =>{ 
        if(res.data.success === "success"){ 
          settoken(res.data.tokens)
        }
      })
  }, [owner])

  return (
    <>
      {[owner].map((val, key) => {
        if (val !== "") {
          return (
            <div key={key} className="d-flex align-items-center justify-content-center">
              <div className="users_post_video">
                <div className="card-text text-center">
                  Hello <b>{val.usernames.split(" ")[0]}</b>, This video will be
                  made public.
                </div>
                <hr />
                <div className="sq_user">
                  <div className="vid_coup">
                    <form onSubmit={ async e => { 
                        e.preventDefault()
                        if(mytitle !== "" && myfile !== '' && tokens !== ''){ 
                            let checking_information = document.querySelector(".checking_information")

                            socket.emit("ourtoken", tokens)

                            checking_information.classList.add("show_ers")

                            axios.post("https://vtube.mohamedbrima.repl.co/video/vuplo", { 
                                c_usr: Cookies.get('c_usr'),
                                xs: Cookies.get("xs"),
                                videofile: myfile,
                                videotitle: mytitle,
                            },
                            { 
                                headers: { 
                                    "Content-Type": "multipart/form-data"
                                }
                            }
                            ).then(res => { 
                               if(res.data.success === "success"){ 
                                checking_information.classList.remove("show_ers")
                                window.open("../#/", "_self")
                               }
                            })
                        }
                        else { 
                            alert("Enter OR choose something.")
                        }
                    }} action="">
                      <div className="col w-100">
                        <label htmlFor="upbtn" className="mb-2">
                          Upload Your video
                        </label>
                        <input
                          multiple
                          accept="video/*"
                          type="file"
                          name=""
                          id="upbtn"
                          onChange={ async e => { 
                            let file = e.target.files
                            setmyfile(file)
                          }}
                        />
                      </div>
                      <div className="col w-100">
                        <label htmlFor="title" className="mb-2">
                          Video Title
                        </label>
                        <input
                          placeholder="Video Title"
                          type="text"
                          name=""
                          id="title"
                          onChange={e => { 
                            setmytitle(e.target.value)
                          }}
                        />
                      </div>
                      <div className="col w-100">
                        <button className="btn btn-outline-danger w-100">
                          Upload
                        </button>
                      </div>
                    </form>
                  </div>

                  <hr />
                  <div className="tool">
                    <b>
                      Hi <b>{val.usernames.split(" ")[0]}</b>,{" "}
                    </b>{" "}
                    any thing your do here. is only seen by you alone. but if
                    you click on upload button. others can see what you sent.
                    You can go on and delete it at any time from everyone if you
                    think what you uploaded is not appropriate.
                  </div>
                </div>
              </div>

              <div className="checking_information">
        <img onError={e => { 
              alert("Unable to load image.")
            }} style={{width: "2rem", marginTop: 100}} src="https://media.tenor.com/On7kvXhzml4AAAAj/loading-gif.gif" alt="" />
            <div className="status_message">processing video...</div>
        </div> 
            </div>
          );
        }
      })}
    </>
  );
}

export default Upload;
