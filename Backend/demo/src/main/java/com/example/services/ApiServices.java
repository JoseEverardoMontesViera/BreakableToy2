package com.example.services;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.servlet.function.EntityResponse;

@Service
public interface ApiServices
{
    public String GetAuthSpotify();

    public String getToken(String authorizationCode);

}
