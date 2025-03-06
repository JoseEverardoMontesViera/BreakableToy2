package com.example.demo;

import com.example.controller.Controller;
import com.example.services.ApiServicesImp;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

import java.util.ArrayList;

import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.header;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
@EnableWebMvc
@WebMvcTest(Controller.class)
public class ControllerTest {
    @Autowired
    private MockMvc mockMvc;
    @MockBean
    private ApiServicesImp apiServicesImp;
    @Autowired
    private Controller controller;

    @Test
    public void login() throws Exception {
        String authUrl = "https://accounts.spotify.com/authorize?client_id=e98e5757a8184e19b67f0e8d4600fd6f&redirect_uri=http%3A%2Flocalhost%3A8080%2Fcallback&scope=user-read-email+ugc-image-upload+user-read-playback-state+user-modify-playback-state+user-read-currently-playing+streaming+app-remote-control+playlist-read-private+playlist-read-collaborative+user-read-playback-position+user-top-read+user-read-recently-played+user-library-read&response_type=code";
        when(apiServicesImp.GetAuthSpotify()).thenReturn(authUrl);
        String result = controller.login();
        assertTrue(result.startsWith("redirect:"), "La respuesta es una redirección.");
        assertTrue(result.contains("https://accounts.spotify.com/authorize"), "La url de redirección contiene 'https://accounts.spotify.com/authorize'.");
    }

}
