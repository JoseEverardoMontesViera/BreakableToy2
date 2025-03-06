import React from 'react'

function Track({props, rank}:any) {
    let seconds = Math.floor(props.duration_ms / 1000);
    let minutes = Math.floor(seconds / 60); 
    let remainingSeconds = seconds % 60;
    let duration
    if(remainingSeconds.toString().length==1 || remainingSeconds == 0){
        duration = minutes.toString()+":0"+remainingSeconds.toString();
    }
    else{
        duration = minutes.toString()+":"+remainingSeconds.toString();
    }
    console.log(props)
    console.log(props.duration_ms)
    function playSong(id:string){
        
    }
    console.log("rank")
    console.log(rank)
  return (
    <div className='track' onClick={()=>playSong(props.id)}>
        <div className='trackLeft'>
            <p>{rank}</p>
            <img src={props.album.images[0].url} alt="AlbumImage" />
            <p>{props.name}</p>
        </div>
        <div className='trackRight'>
            <p>{props.popularity}</p>
            <p>{duration}</p>

        </div>
    </div>
  )
}

export default Track
