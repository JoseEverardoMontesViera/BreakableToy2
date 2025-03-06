import React, { useEffect, useState } from 'react'
import { Link } from 'react-router';
import { p } from 'react-router/dist/development/fog-of-war-Cm1iXIp7'
import mockArtist from '../mockData/mockArtist.json'
import mockArtistAlbums from '../mockData/mockArtistAlbums.json'
import mockArtistTopTracks from '../mockData/mockArtistTopTracks.json'
import CardGenerator from './CardGenerator';
import TrackLister from './TrackLister';
import axios from 'axios';
import logo from '../imgs/spotifyLogo.png'

function ArtistDetail(props:{id:any}) {
    const [data, setData] = useState<any>({});
    const [albums, setAlbumbs] = useState<any>({});
    const [topTracks, setToptracks] = useState<any>({});
    const [token, setToken] = useState(false);
    useEffect(() => {
      axios.get('http://localhost:8080/checkToken')
        .then(response => {
        console.log(response)
          if (response.data == 'Token exists') {
            setToken(true);
            console.log("ENTRAO")
            //Space for some action :D
            axios.get('http://localhost:8080/artists/'+props.id)
            .then(response=>{
                setData(response.data);
            })
            axios.get('http://localhost:8080/artists/'+props.id+'/albums')
            .then(response=>{
                setAlbumbs(response.data);
            })
            axios.get('http://localhost:8080/artists/'+props.id+'/top-tracks')
            .then(response=>{
                setToptracks(response.data);
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
    console.log(token)
    console.log(data)
    if(props.id!=undefined){
        {console.log("albums")}
        {console.log(albums)}
    let image;
    if(data.images==undefined){
        image = logo
    }
    else{
        image = data.images[0].url 
    }
    let followers;
    if(data.followers==undefined){
        followers = ""
    }
    else{
        followers = data.followers.total
    }
        return (
    
            <div className='details'>
                
                <Link to="/"><button className='GoBack'> &larr;</button></Link>
                <h1 className='title'>{data.name}</h1>
                <img src={image} alt="Artist image" className='titleImage'/>
                <h1 className='subtitle'>{followers} followers</h1>
                <h1 className='subtitle'>Popular songs</h1>
                <TrackLister trackList={topTracks}></TrackLister>
                {/* Aqui meteré un componente que sea una lista bonita de canciones de ese artista */}
                <h1 className='subtitle'>Discography</h1>
                <CardGenerator information={albums}></CardGenerator>
                {/* Generador de tarjetas alimenntado por albumes del artista */}
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

export default ArtistDetail
