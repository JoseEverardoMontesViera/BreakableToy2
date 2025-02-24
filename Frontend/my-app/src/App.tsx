import React from 'react';
import LoginPage, { Username, Password, Submit, Title, Logo, Reset } from '@react-login-page/page1';
import Login from '@react-login-page/page1';
import SpotifyLogo from './imgs/spotifyLogo.png';

import './App.css';

function App() {
  const styles = { height: 620 };
  return (
    
    <div className="App">
      <div className='login'>
        
    <LoginPage>
      <Username name="userUserName" visible={false}/>
      <Password placeholder="请输入密码" name="userPassword" visible={false} />
      <Submit>Login</Submit>
      <Reset disabled visible={false}>Reset</Reset>
      <Title keyname="title">eeeeee</Title>
      <Title/>
      <Login.Logo><img src="./imgs/spotifyLogo.png" alt="" /></Login.Logo>
      <Login.Title>Login to Spotify</Login.Title>
    </LoginPage>
  </div>
    </div>
  );
}

export default App;
