import React from 'react'
import { useParams } from 'react-router'
import PlaylistDetail from './PlaylistDetail'
function PlaylistMenu() {
  const {id}=useParams()
  console.log(id);
  return (
    <div className='menu'>
      <PlaylistDetail id={id}></PlaylistDetail>
    </div>
  )
}

export default PlaylistMenu
