import React from 'react'
import logo from '../imgs/spotifyLogo.png'
import { Link } from 'react-router';
const ArtistCard = (props: {img:string, name: string,genres:any}) => {
  // Datos Esperados
  // props.img es items[n].images[0].url
  // props.name es items[n].name
  // props.genres es items[n].genres
  
  let genres;
  if(props.genres.length==0){
    genres="";
  }
  else{
    genres = [props.genres[0]]
    if(props.genres.length>1){
       props.genres.forEach((element: string) => {
        if(element != props.genres[0]){
          element = ","+element;
          genres.push(element)
        }
       });
    }
  }
  return (
    <Link to="/login" className='cardLink'>
      <div className='SpotifyCard'>
        <div className='pic'>
          <img src={props.img ? props.img:logo} alt="" />
        </div>
        <div className='text'>
          <p>Artist Name: {props.name ? props.name:"NotFound"}</p>
          <p>Genres: {genres? genres:"NotFound"}</p>
        </div>
      </div>
    </Link>
    
  )
}

export default ArtistCard;
