import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import ArtistDetail from './ArtistDetail';
import axios from 'axios';

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
