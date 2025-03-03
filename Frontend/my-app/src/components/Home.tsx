import CardGenerator from './CardGenerator'
import mock from '../mockData/mock.json'
import mockTopArtist from '../mockData/mockTopArtist.json'
export function Home(){

    return(
        <div className='Background'>
            <h1>Welcome to my app</h1>
            {/* Aquí va una barra de busqueda, la barra de busqueda le pasa la info al generador de tarjetas */}
            {/* De una aqui se debe mostrar el top 10 artistas */}
            <div className='searchContainer'>
                <label htmlFor="searchInput">Search for some music!</label>
                <input type="text" id='searchInput' className='searchInput'/>
            </div>
            <div className='topArtist'>
                <div className='topArtistTitleBackground'>
                    <p className='topArtistTitle'>My top Artists</p>
                </div>
                <div className='cardContainer'>
                    <CardGenerator information={mockTopArtist}></CardGenerator>
                </div>
            </div>
            <div className='searchResults'>
                <CardGenerator information={mock}></CardGenerator>
            </div>
        </div>
        
    )
}