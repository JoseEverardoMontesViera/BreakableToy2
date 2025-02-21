package com.example.services;

import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.servlet.function.EntityResponse;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.Random;

@Service
public class ApiServicesImp implements ApiServices {
    @Autowired
    private RestTemplate restTemplate;

    private String accesstoken;

    public String getAccesstoken() {
        return accesstoken;
    }

    public void setAccesstoken(String accesstoken) {
        this.accesstoken = accesstoken;
    }

    @Override
    public String GetAuthSpotify() {
        String redirectUri="http://localhost:8080/auth/spotify";
        String scope="user-read-email ugc-image-upload user-read-playback-state user-modify-playback-state user-read-currently-playing streaming app-remote-control playlist-read-private playlist-read-collaborative user-read-playback-position user-top-read user-read-recently-played user-library-read";
        String clientId = "e98e5757a8184e19b67f0e8d4600fd6f";
//        String clientSecret = "011f733ce3d64a69926029eae0b5a195";
        String authUrl = "https://accounts.spotify.com/authorize?client_id="+ clientId +
                "&redirect_uri=" + URLEncoder.encode(redirectUri, StandardCharsets.UTF_8) +
                "&scope=" + URLEncoder.encode(scope, StandardCharsets.UTF_8) +
                "&response_type=code";
        System.out.println(authUrl);
        return authUrl;
    }

    @Override
    public String getToken(String authorizationCode) {
        final String tokenUrl = "https://accounts.spotify.com/api/token";
        final String clientId = "e98e5757a8184e19b67f0e8d4600fd6f";
        final String clientSecret = "011f733ce3d64a69926029eae0b5a195";
        final String redirectUri = "http://localhost:8080/auth/spotify";
        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("grant_type", "authorization_code");
        params.add("code", authorizationCode);
        params.add("redirect_uri", redirectUri);
        params.add("client_id", clientId);
        params.add("client_secret", clientSecret);
        MultiValueMap<String, String> headers = new LinkedMultiValueMap<String, String>();
        headers.add("content-type", "application/x-www-form-urlencoded");
        headers.add("Authorization", "Basic "+ Base64.getEncoder().encodeToString((clientId+":"+clientSecret).getBytes()));
        HttpEntity<MultiValueMap<String, String>> entity = new HttpEntity<>(params, headers);
        ResponseEntity<String> response = restTemplate.exchange(tokenUrl, HttpMethod.POST, entity, String.class);
        if(response.getStatusCode().equals(HttpStatus.valueOf(200))){
            setAccesstoken(response.getBody());
        }
        return response.getBody();
    }
}
