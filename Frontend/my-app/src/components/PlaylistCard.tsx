import React from 'react'
import logo from '../imgs/spotifyLogo.png'
import { Link } from 'react-router'

const PlaylistCard = (props: {img:string, name: string,creator:string,numberOfSongs:number}) => {
  // Datos Esperados
  // props.img es items[n].images[0].url
  // props.name es items[n].name
  // props.creator es item[n].owner.display_name
  // props.numberOfSongs es item[n].tracks.total
  console.log("entre")
  return (
    <Link to="#" className='cardLink'>
      <div className='SpotifyCard'>
        <div className='pic'>
          <img src={props.img ? props.img:logo} alt="" />
        </div>
        <div className='text'>
          <p>Playlist Name: {props.name? props.name:"NotFound"}</p>
          <p>Playlist Creator: {props.creator? props.creator:"NotFound"}</p>
          <p>Number of songs: {props.numberOfSongs? props.numberOfSongs:"NotFound"}</p>
        </div>
        
      </div>
    </Link>
    
  )
}

export default PlaylistCard;
