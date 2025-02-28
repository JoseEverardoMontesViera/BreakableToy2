import React, { useState } from 'react';
import {LogInForm} from './components/LogInForm';
import { Home } from './components/Home';
import { Link, BrowserRouter, Route, Routes } from 'react-router';
import './App.css';


const Login = () => <h1>Login</h1>;
const Jome = () => <h1>Home Page</h1>;
const ArtistMenu = () => <h1>Artist Menu</h1>;
const AlbumMenu = () => <h1>Album Menu</h1>;
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<LogInForm></LogInForm>}></Route>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/artists/' element={<Home></Home>}></Route>
        <Route path='/album/' element={<Home></Home>}></Route>
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
