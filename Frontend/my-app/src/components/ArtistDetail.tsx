import React, { useEffect, useState } from 'react'
import { Link } from 'react-router';
import { p } from 'react-router/dist/development/fog-of-war-Cm1iXIp7'
import mockArtist from '../mockData/mockArtist.json'
import mockArtistAlbums from '../mockData/mockArtistAlbums.json'
import mockArtistTopTracks from '../mockData/mockArtistTopTracks.json'
import CardGenerator from './CardGenerator';
import TrackLister from './TrackLister';

function ArtistDetail(props:{id:any}) {
    const [data, setData] = useState<any>(mockArtist);
    const [albums, setAlbumbs] = useState<any>(mockArtistAlbums);
    const [topTracks, setToptracks] = useState<any>(mockArtistTopTracks);
    // useEffect(() => {
    //     Aquí Necesito hacer un fetch hacia mi endpoint
    //      setData();
    // }, []);
    console.log(data)
    if(props.id!=undefined){
        {console.log("albums")}
        {console.log(albums)}
        return (
    
            <div className='details'>
                
                <Link to="/"><button>Go back</button></Link>
                <h1 className='title'>{data.name}</h1>
                <img src={data.images[0].url} alt="Artist image" className='titleImage'/>
                <h1 className='subtitle'>Artist followers: {data.followers.total}</h1>
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
