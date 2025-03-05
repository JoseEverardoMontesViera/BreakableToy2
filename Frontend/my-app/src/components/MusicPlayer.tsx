import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router';
import { useSong } from './SongContext';
function MusicPlayer(props:any) {
  const track = {
    name: "",
    album: {
        images: [
            { url: "" }
        ]
    },
    artists: [
        { name: "" }
    ]
}
  const { songId, setSongId } = useSong();
  const location = useLocation(); // Obtener el estado desde el enlace
  const { img, name, artist, year, id } = location.state || {}; // Desestructurar los datos
  const [player, setPlayer] = useState<any>(undefined);
  const [is_paused, setPaused] = useState(false);
  const [is_active, setActive] = useState(false);
  const [current_track, setTrack] = useState(track);
  const [token, setToken] = useState<string>('');
  const [deviceId, setDeviceId] = useState<string>('');
  const [isTokenReady, setIsTokenReady] = useState<boolean>(false); 
  const [scriptLoaded, setScriptLoaded] = useState<boolean>(false); 
  const [volume, setVolume] = useState(50);
  const [lastSentVolume, setLastSentVolume] = useState(50); 
  
  useEffect(() => {
    if (isTokenReady && !scriptLoaded) {
      window.onSpotifyWebPlaybackSDKReady = () => {
        const player = new window.Spotify.Player({
          name: 'Web Playback SDK',
          getOAuthToken: (cb: any) => {
            cb(token);
          },
          volume: 0.5
        });

        setPlayer(player);

        player.addListener('ready', ({ device_id }: any) => {
          setDeviceId(device_id)
          axios.get("http://localhost:8080/transfer/"+device_id);
          console.log('Ready with Device ID', device_id);
        });

        player.addListener('not_ready', ({ device_id }: any) => {
          console.log('Device ID has gone offline', device_id);
        });
        player.addListener('player_state_changed', ( (state:any) => {

          if (!state) {
              return;
          }
      
          setTrack(state.track_window.current_track);
          setPaused(state.paused);
      
      
          player.getCurrentState().then( (state:any) => { 
              (!state)? setActive(false) : setActive(true) 
          });
      
      }));
        player.connect();
      };


      const script = document.createElement('script');
      script.src = 'https://sdk.scdn.co/spotify-player.js';
      script.async = true;

      document.body.appendChild(script);

      script.onload = () => {
        console.log('Spotify SDK cargado exitosamente');
        setScriptLoaded(true);
      };

      script.onerror = (error) => {
        console.error('Error al cargar el SDK de Spotify:', error);
        setScriptLoaded(false);
      };
    }
    
  }, [isTokenReady, scriptLoaded, token]);

  useEffect(() => {

    axios.get(`http://localhost:8080/getAt`)
      .then(response => {
        setToken(response.data); 
        setIsTokenReady(true); 
      })
      .catch(error => {
        console.error('Error obteniendo el token:', error);
      });
  }, []); 
  useEffect(() => {
    if (player && songId) {

      axios.get('http://localhost:8080/track/'+songId).then(
        response=>{
          console.log('Reproduciendo la canción: ', response.data)
          let song = {
            name: response.data.name,
            album: {
                images: [
                    { url: response.data.album.images[0].url}
                ]
            },
            artists: [
                { name:response.data.artists[0].name }
            ],
            uri: response.data.uri,
          }
          //  axios.post("http://localhost:8080/play",
          //   {
          //     uri: song.uri,
          //   }
          //  )
          axios.put('https://api.spotify.com/v1/me/player/play', 
            {
              uris: [song.uri],
              position_ms: 0
            },
            {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
              }
            }
          )
          .then(response => {
            console.log('Respuesta exitosa:', response);
          })
          .catch(error => {
            console.error('Error en la solicitud:', error);
          });
          
        }
      )
      
    }
  }, [songId, player]);

  function handleVolume(e:any){
    const newVolume = parseInt(e.target.value);
    if (Math.abs(newVolume - lastSentVolume) >= 9) {
      setVolume(newVolume);
      console.log(volume)
      setLastSentVolume(newVolume);
      axios.post(`http://localhost:8080/volume/${newVolume}`)
    }
    if(volume<=10){
      axios.post(`http://localhost:8080/volume/0`);
    }
  }
  return (
    <div className='musicPlayer'>
      <div className="main-wrapper">
        <img src={current_track.album.images[0].url} className="now-playing__cover" alt="" />
        <div className="now-playing__side">
          <div className="now-playing__name">{current_track.name}</div>
          <div className="now-playing__artist">{current_track.artists[0].name}</div>
        </div>
        <div className='controls'>
          <button className="btn-spotify" onClick={() => { player.togglePlay() }} >
            { is_paused ? <i className="fas fa-play"></i> : <i className="fas fa-pause"></i> }
          </button>
        </div>
        <input type="range" className='volumeSlider'onChange={(e)=>handleVolume(e)} defaultValue={volume}></input> 
      </div>
    </div>
  )
}

export default MusicPlayer
