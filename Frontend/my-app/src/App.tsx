import React, { useState } from 'react';
import {LogInForm} from './components/LogInForm';
import { Home } from './components/Home';
import { Link, BrowserRouter, Route, Routes } from 'react-router';
import './App.css';
import Layout from './components/Layout';
import ArtistMenu from './components/ArtistMenu';
import AlbumMenu from './components/AlbumMenu';
import PlaylistMenu from './components/PlaylistMenu';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path='/login' element={<LogInForm></LogInForm>}></Route> */}
        <Route path='/' element={<Layout></Layout>}>
          <Route path='/' element={<Home></Home>}></Route>
          <Route path='/artists/:id' element={<ArtistMenu></ArtistMenu>}></Route>
          <Route path='/albums/:id' element={<AlbumMenu></AlbumMenu>}></Route>
          <Route path='/playlists/:id' element={<PlaylistMenu></PlaylistMenu>}></Route>
        </Route>
        
      </Routes> 
    </BrowserRouter>
    //{getContent()}
    // <BrowserRouter>
    //   <LogInForm></LogInForm>
    //   <Home></Home>
    // </BrowserRouter>
  );
}

export default App;
