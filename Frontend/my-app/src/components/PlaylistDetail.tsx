import React, { useEffect, useState } from 'react'
import { Link } from 'react-router';
import { p } from 'react-router/dist/development/fog-of-war-Cm1iXIp7'
import mockPlaylist from "../mockData/mockPlaylist.json"
import CardGenerator from './CardGenerator';
import TrackListerPlaylist from './TrackListerPlaylist';
import axios from 'axios';
import logo from '../imgs/spotifyLogo.png'

function PlaylistDetail(props:{id:any}) {
  const [data, setData] = useState<any>({});
  const [token, setToken] = useState(false);
  useEffect(() => {
    axios.get('http://localhost:8080/checkToken')
      .then(response => {
      console.log(response)
        if (response.data == 'Token exists') {
          setToken(true);
          console.log("ENTRAO")
          //Space for some action :D
          axios.get('http://localhost:8080/playlist/'+props.id)
          .then(response=>{
              setData(response.data);
          })
          
          
        } else {
          console.log("fallao")
          setToken(false);
          if (!token) {
              console.log(token)
              window.location.href = 'http://localhost:3000/login';
          }
        }
      })
      .catch(error => {
          console.log(error)
          setToken(false);
          if (!token) {
              console.log(token)
              window.location.href = 'http://localhost:3000/login';
          }
      })
      
  }, []);
  // useEffect(() => {
  //     Aquí Necesito hacer un fetch hacia mi endpoint
  //      setData();
  // }, []);
  let items;
    if(data.tracks==undefined){
        items = []
    }
    else{
        items = data.tracks.items
    }
    let followers;
    if(data.followers==undefined){
        followers = ""
    }
    else{
        followers = data.followers.total
    }
    let image;
    if(data.images==undefined){
        image = logo
    }
    else{
        image = data.images[0].url 
    }
    
  if(props.id!=undefined){
      return (
  
          <div className='details'>
              
              <Link to="/"><button className='GoBack'> &larr;</button></Link>
              <h1 className='title'>{data.name}</h1>
              <img src={image} alt="Artist image" className='titleImage'/>
              <h2>{data.description}</h2>
              <h1 className='subtitle'>Playlist followers: {followers}</h1>
              <h1 className='subtitle'>Songs</h1>
              <TrackListerPlaylist trackList={items}></TrackListerPlaylist>
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
