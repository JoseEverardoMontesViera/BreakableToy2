import React from 'react'
import logo from '../imgs/spotifyLogo.png'
import SongCard from './SongCard';
import AlbumCard from './AlbumCard';
import ArtistCard from './ArtistCard';
import PlaylistCard from './PlaylistCard';
function CardGenerator(information: any) {
    let data = information.information;

    return (
        <div className="cardBlock">
        {data.type==undefined?
            data.href=="https://api.spotify.com/v1/me/top/artists?limit=10"? 
            // In this case, the information is top artist
            data.items.map((element:any) => { return(<ArtistCard img={element.images[0].url} name={element.name} genres={element.genres}></ArtistCard>)   
        }):
        Object.keys(data).map((key: any) => {
            console.log(data)
            console.log(key)
            if (key === "albums") {
                return data[key].items.map((element: any) => { 
                    console.log("album")
                    if(element!=null){
                        const imageUrl = element.images && element.images.length > 0 ? element.images[0].url : logo;
                        return(<AlbumCard img={imageUrl} name={element.name?element.name:"Unknown name"} artist={element.artists?element.artists:"Unknown artists"} year={element.release_date?element.release_date:"Unknown relase date"}></AlbumCard>)
                    }
                        })
                }
            if(key === "artists") {
                return data[key].items.map((element: any) => { 
                    console.log("artist")
                    if(element!=null){
                        const imageUrl = element.images && element.images.length > 0 ? element.images[0].url : logo;
                        return(<ArtistCard img={imageUrl} name={element.name?element.name:"Unknown name"} genres={element.genres?element.genres:"Unknown genres"}></ArtistCard>)
                    }
                    // console.log(element)
                        })
                }
            if(key === "playlists") {
                console.log("playlist")
                return data[key].items.map((element: any) => { 
                    if(element!=null){
                        console.log(element)
                        return(<PlaylistCard img={element.images[0].url?element.images[0].url:logo} name={element.name?element.name:"Unknown name"} creator={element.owner.display_name?element.owner.display_name:"Unknown creator"} numberOfSongs={element.tracks.total?element.tracks.total:"Unknownn total tracks"}></PlaylistCard>)
                    }
                        })
                }
            if(key === "tracks") {
                return data[key].items.map((element: any) => { 
                    console.log("track")
                    if(element!=null){
                        // console.log(element)
                        // console.log(element.album.images[0].url, " URRRRRLLLLL")
                        // console.log(element.name)
                        // console.log(element.artists)
                        // console.log(element.album.release_date)
                        return(<SongCard img={element.album.images[0].url?element.album.images[0].url:logo} name={element.name?element.name:"Unknown name"} artist={element.artists?element.artists:"Unknown artists"} year={element.album.release_date?element.album.release_date:"Unknnown relase date"}></SongCard>)
                        }
                    })
                }

                return(<p></p>);
        })
        :
        // In this case, the information is a searchß
                
            // In this case, the information is a specific item, that means a specific card
            console.log("specific")
        }
    </div>
  )
}

export default CardGenerator
