import LoginPage, { Username, Password, Submit, Title, Logo, Reset } from '@react-login-page/page1';
import Login from '@react-login-page/page1';
import axios from 'axios';
export function LogInForm(){
    function log(){
        window.location.href = 'http://localhost:8080/login';
    }
    return(
        <section>
            <div className='login'>
                    
                <LoginPage>
                    <Username visible={false}/>
                    <Password visible={false} />
                    <Submit onClick={() => log()}>Login</Submit>
                    <Title/>
                    <Login.Logo><img src="./imgs/spotifyLogo.png" alt="" /></Login.Logo>
                    <Login.Title>Login to Spotify</Login.Title>
                </LoginPage>
                
            </div> 
        </section>
    )
}