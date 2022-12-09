import React from 'react'
import { Route, Routes } from 'react-router-dom'

import io from 'socket.io-client'
import Home from './Main/Home'
import Account from './pages/Account'
import Chat from './pages/Chat'
import Error from './pages/Error'
import Libary from './pages/Libary'
import Preview from './pages/Preview'
import User from './pages/User'
import Upload from './Upload/Upload'

let socket = new io("https://vtube.mohamedbrima.repl.co")

function Routiing() {
  return (
    <Routes>
      <Route path='/' element={<Home socket={socket}/>}/>
      <Route path='/Account' element={<Account socket={socket}/>}/>
      <Route path='/Chat/:id' element={<Chat socket={socket}/>}/>
      <Route path='/Lib' element={<Libary socket={socket}/>}/>
      <Route path='/watch/:id' element={<Preview socket={socket}/>}/>
      <Route path='/User/:id' element={<User socket={socket}/>}/>
      <Route path='/*' element={<Error socket={socket}/>}/>
      <Route path='/Upload' element={<Upload socket={socket}/>}/>
    </Routes>
  )
}

export default Routiing
