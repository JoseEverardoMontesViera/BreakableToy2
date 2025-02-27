import LoginPage, { Username, Password, Submit, Title, Logo, Reset } from '@react-login-page/page1';
import Login from '@react-login-page/page1';
export function LogInForm(){
    
    return(
        <section>
            <div className='login'>
                    
                <LoginPage>
                    <Username name="userUserName" visible={false}/>
                    <Password placeholder="请输入密码" name="userPassword" visible={false} />
                    <Submit>Login</Submit>
                    {/* <Submit.call>{handle}</Submit.call> */}
                    <Reset disabled visible={false}>Reset</Reset>
                    <Title/>
                    <Login.Logo><img src="./imgs/spotifyLogo.png" alt="" /></Login.Logo>
                    <Login.Title>Login to Spotify</Login.Title>
                </LoginPage>
                
            </div> 
        </section>
    )
}