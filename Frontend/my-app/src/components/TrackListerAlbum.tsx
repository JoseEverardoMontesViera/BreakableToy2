import React, { useEffect, useState } from 'react'
import Track from './Track'
import DataTable from 'react-data-table-component'
import axios from 'axios';

function TrackListerAlbum({trackList}:any) {
  const [token, setToken] = useState<string>('');
  useEffect(() => {
    axios.get(`http://localhost:8080/getAt`)
        .then(response => {
          setToken(response.data);
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }, []);
    function handleClick(row:any){
      axios.put('https://api.spotify.com/v1/me/player/play', 
        {
          uris: [row.uri],
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
      console.log("trako")
      console.log(trackList)
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
          name: 'Song Name',
  
          cell:(row:any)=> row.name,
        },
        {
          name: 'Song length',
          cell:(row:any)=> convertMilliseconds(row.songLength),
        },
      ];
      const conditionalRowStyles=[
        {
          when: (row:any) => row.rank,
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
      const data = [trackList.sort((a: any, b: any) => b.popularity - a.popularity).map((element:any, i:number)=>{
        {
          return(
            { 
              rank:i+1,
              name:element.name,
              songLength:element.duration_ms,
              id:element.id,
              uri:element.uri
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

export default TrackListerAlbum
