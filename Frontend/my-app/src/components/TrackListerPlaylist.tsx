import React from 'react'
import DataTable from 'react-data-table-component'
function TrackListerPlaylist({trackList}:any) {
    function handleClick(row:any){
        return console.log(row)
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
      const styles={
        rows: {
            style: {
                minHeight: '80px', // override the row height
            },
        },
        headCells: {
            style: {
                paddingLeft: '8px', // override the cell padding for head cells
                paddingRight: '8px',
                fontSize:'20px',
                
            },
        },
        cells: {
            style: {
                paddingLeft: '8px', // override the cell padding for data cells
                paddingRight: '8px',
                fontSize:'15px'
                
            },
        },
        pagination:{
          style:{
            fontSize: '25px',
          },
          pageButtonsStyle:{
            padding: '9px',
            margin: '1  px',
          }
        }
        
    };
      const columns = [
        {
          name: '#',
          // marginright:'100px',
          marginLeft:'0px',
          width:'50px',
          maxWidth:'0px',
          cell:(row:any)=> row.rank,
        },
        {
          name: 'Image',
          marginLeft:'0px',
          cell:(row:any)=> <img src={row.image} alt="album image" className='listImage'></img>,
        },
        {
          name: 'Song Name',
  
          cell:(row:any)=> row.name,
        },
        {
          name: 'Popularity',
          cell:(row:any)=> row.popularity,
        },
        {
          name: 'Song length',
          cell:(row:any)=> convertMilliseconds(row.songLength),
        },
      ];
      const conditionalRowStyles=[
        {
          when: (row:any) => row.image,
          style: {
            width: 'auto',
            height: '10px',
            marginLeft:'0px',
            '&:hover': {
              cursor: 'pointer',
              backgroundColor: 'lightgray',
            },
          },
        },
        
      ]
      const data = [trackList.sort((a: any, b: any) => b.track.popularity - a.track.popularity).map((element:any, i:number)=>{
        {
          return(
            { 
              rank:i+1,
              image:element.track.album.images[0].url,
              name:element.track.name,
              popularity:element.track.popularity,
              songLength:element.track.duration_ms,
              id:element.track.id,
            }
          )
        }
      })]
      console.log(data)
    return (
      <div className='TrackList'>
        <DataTable
            columns={columns}
            data={data[0]}
            customStyles={styles}
            conditionalRowStyles={conditionalRowStyles}
            onRowClicked={handleClick}
          />
      </div>
    )
}

export default TrackListerPlaylist
