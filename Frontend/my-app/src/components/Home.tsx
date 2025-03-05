import CardGenerator from './CardGenerator'
import mock from '../mockData/mock.json'
import mockTopArtist from '../mockData/mockTopArtist.json'
import { useEffect, useState } from 'react';
import axios from 'axios';
import doodle from '../imgs/doodlePng.png'
import { e } from 'react-router/dist/development/route-data-BmvbmBej';
export function Home(){
    const [artistData, setArtistData] = useState({});
    const [searchTermn, setSearchTerm] = useState('');
    const [searchData, setSearchData] = useState({});
    const [token, setToken] = useState(false);
    useEffect(() => {
      axios.get('http://localhost:8080/checkToken')
        .then(response => {
          if (response.data == 'Token exists') {
            setToken(true);
            axios.get('http://localhost:8080/me/top/artists')
            .then(response =>{
                setArtistData(response.data)
            })
          } else {
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
    
    const changeSearchTermn = (event:any)=>{
        setSearchTerm(event.target.value);
      }
    function search(){
        console.log(token)
        console.log(searchTermn);
        setTimeout(() => {
            window.scrollTo({
            top: window.innerHeight,
            behavior: 'smooth' 
            });
        }, 100)
        axios.get(`http://localhost:8080/search`, {
            params: { termn: searchTermn }
        })
        .then(response =>{
            setSearchData(response.data)
        })
    }
    return(
        <div className='Background'>
            {/* <img src={doodle} alt="doodle background image" className='doodleBackground' /> */}
            <div className='searchContainer'>
                <label htmlFor="searchInput" className="searchBarLabel">Search for some music!</label>
                <input type="text" id='searchInput' className='searchInput' value={searchTermn} onChange={changeSearchTermn}/>
                <button className='searchButton' onClick={()=>search()}>Search!</button>
            </div>
            <div className='topArtist'>
                <div className='topArtistTitleBackground'>
                    <p className='topArtistTitle'>My top Artists</p>
                </div>
                <div className='cardContainer'>
                    <CardGenerator information={artistData}></CardGenerator>
                </div>
            </div>
            <div className='searchResults'>
                <CardGenerator information={searchData}></CardGenerator>
            </div>
        </div>
        
    )
}