import React from 'react'
import { useParams } from 'react-router'
import AlbumDetail from './AlbumDetail'

function AlbumMenu() {
  const {id}=useParams()
  console.log(id);
  return (
    <div className='menu'>
      <AlbumDetail id={id}></AlbumDetail>
    </div>
  )
}

export default AlbumMenu
