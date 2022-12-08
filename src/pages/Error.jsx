import React from 'react'
import { Link } from 'react-router-dom'

function Error() {
  return (
    <div style={{width: "100%", height: "100vh", position: 'fixed', zIndex: -1, top: 0, left: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', textAlign: "center"}}>
      <div className="h1" style={{pointerEvents: 'none', WebkitUserSelect: "none", userSelect: 'none'}}>This page doesn't exist.</div>
      <Link style={{ WebkitUserSelect: "none", userSelect: 'none'}} to={"../"}>Go Home.</Link>
    </div>
  )
}

export default Error
