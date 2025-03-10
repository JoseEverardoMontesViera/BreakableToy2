import React from 'react'
import logo from '../imgs/spotifyLogo.png'
import { Link } from 'react-router';
import { useSong } from './SongContext';
function SongCard(props: {img:string, name: string,artist:any,year:number, id:string}) {
  // Datos Esperados
  // props.img es items[n].images[0].url
  // props.name es items[n].name
  // props.artist es item[n].artist[all].name
  // props.year es item[n].album.release_date
  const {setSong} = useSong(); 
  let artist:any;
  if(props.artist.length==0){
    artist="";
  }
  else{
    artist = [props.artist[0].name]
    if(props.artist.length>1){
       props.artist.forEach((element: any) => {
        if(element.name != props.artist[0].name){
          element.name = ","+element.name;
          artist.push(element.name)
        }
       });
    }
  }
  const handleClick = () => {
    setSong(props.id);
  };

  return (
    <div className='cardLink' onClick={handleClick}>
      <div className='SpotifyCard'>
        <div className='pic'>
          <img src={props.img ? props.img:logo} alt="" />
        </div>
        <div className='text'>
          <p>Song Title: {props.name? props.name:"NotFound"}</p>
          <p>Artist: {artist? artist.toString():"NotFound"}</p>
          <p>Year: {props.year? props.year:"NotFound"}</p>
        </div>
      </div>
    </div>
    
  )
}

export default SongCard
