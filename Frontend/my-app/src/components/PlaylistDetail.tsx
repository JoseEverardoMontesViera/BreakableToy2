import React, { useEffect, useState } from 'react'
import { Link } from 'react-router';
import { p } from 'react-router/dist/development/fog-of-war-Cm1iXIp7'
import mockPlaylist from "../mockData/mockPlaylist.json"
import CardGenerator from './CardGenerator';
import TrackListerPlaylist from './TrackListerPlaylist';

function PlaylistDetail(props:{id:any}) {
  const [data, setData] = useState<any>(mockPlaylist);
  // useEffect(() => {
  //     Aquí Necesito hacer un fetch hacia mi endpoint
  //      setData();
  // }, []);
  console.log(data)
  console.log(data.tracks.items)
  if(props.id!=undefined){
      return (
  
          <div className='details'>
              
              <Link to="/"><button>Go back</button></Link>
              <h1 className='title'>{data.name}</h1>
              <img src={data.images[0].url} alt="Artist image" className='titleImage'/>
              <h2>{data.description}</h2>
              <h1 className='subtitle'>Artist followers: {data.followers.total}</h1>
              <h1 className='subtitle'>Songs</h1>
              <TrackListerPlaylist trackList={data.tracks.items}></TrackListerPlaylist>
              {/* Aqui meteré un componente que sea una lista bonita de canciones*/}
          </div>
    )
  }
  else{
      return(
          <p>Not found</p>
      )
  }
  
}

export default PlaylistDetail
