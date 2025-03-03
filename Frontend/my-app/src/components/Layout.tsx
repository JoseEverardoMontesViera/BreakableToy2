import React from 'react'
import { Outlet } from 'react-router'
import MusicPlayer from './MusicPlayer'

function Layout() {
  return (
    <div>
        <Outlet></Outlet>
        <MusicPlayer></MusicPlayer>
    </div>
  )
}

export default Layout
