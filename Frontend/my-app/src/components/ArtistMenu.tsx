import React from 'react'
import { useParams } from 'react-router'
import ArtistDetail from './ArtistDetail';

function ArtistMenu() {
  const {id}=useParams()
  console.log(id);
  return (
    <div className='menu'>
      <ArtistDetail id={id}></ArtistDetail>
    </div>
  )
}

export default ArtistMenu
