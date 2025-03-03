import React from 'react'
import logo from '../imgs/spotifyLogo.png'
import { Link } from 'react-router';
const AlbumCard = (props: {img:string, name: string,artist:any,year:number, id:string}) => {
  // Datos Esperados
  // props.img es items[n].images[0].url
  // props.name es items[n].name
  // props.genres es items[n].genres
  const artistNames = props.artist.map((artist: any) => artist.name).join(", ") || "Unknown artist";
  let idRoute = "/albums/"+props.id;
  return (
    <Link to={idRoute} className='cardLink'>
      <div className='SpotifyCard'>
        <div className='pic'>
          <img src={props.img ? props.img:logo} alt="" />
        </div>
        <div className='text'>
          <p>Album Title: {props.name ? props.name:"NotFound"}</p>
          <p>Artist: {artistNames? artistNames:"NotFound"}</p>
          <p>Year: {props.year? props.year:"NotFound"}</p>
        </div>
      </div>
    </Link>
    
  )
}

export default AlbumCard;
