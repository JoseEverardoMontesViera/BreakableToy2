import React, { useEffect, useState } from 'react'
import { Link } from 'react-router';
import { p } from 'react-router/dist/development/fog-of-war-Cm1iXIp7'
import mockAlbum from '../mockData/mockAlbum.json'
import CardGenerator from './CardGenerator';
import TrackLister from './TrackLister';
import TrackListerAlbum from './TrackListerAlbum';
import axios from 'axios';
import logo from '../imgs/spotifyLogo.png'

function AlbumDetail(props:{id:any}) {
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
            axios.get('http://localhost:8080/albums/'+props.id)
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
  console.log(data)
  function duration(items:any){
    let duration=0;
    items.forEach((element:any) => {
      duration+=element.duration_ms
    });
    return convertMilliseconds(duration);
  }
  function convertMilliseconds(ms:any){
    let seconds = Math.floor(ms / 1000);
    let minutes = Math.floor(seconds / 60); 
    let remainingSeconds = seconds % 60;
    let duration;
    if(remainingSeconds.toString().length==1 || remainingSeconds == 0){
        return duration = minutes.toString()+":0"+remainingSeconds.toString();
    }
    else{
        return duration = minutes.toString()+":"+remainingSeconds.toString();
    }
  }
  if(props.id!=undefined){
    let image;
    if(data.images==undefined){
        image = logo
    }
    else{
        image = data.images[0].url 
    }
    let items;
    if(data.tracks==undefined){
      items = []
    }
    else{
      items = data.tracks.items
    }
      return (
  
          <div className='details'>
              
              <Link to="/"><button className='GoBack'> &larr;</button></Link>
              <h1 className='title'>{data.name}</h1>
              <img src={image} alt="Artist image" className='titleImage'/>
              <h2 className='subtitle'>Album's relase date: {data.release_date} <br /> Songs: {data.total_tracks} <br />Total duration: {duration(items)} min</h2>
              <h1 className='subtitle'>Album songs</h1>
              <TrackListerAlbum trackList={items}></TrackListerAlbum>
              {/* <h2 className='subtitle'>Related Artists</h2>
              Aqui usaré la api publica de spotify */}
          </div>
    )
  }
  else{
      return(
          <p>Not found</p>
      )
  }
  
}

export default AlbumDetail
