package com.example.controller;
import com.example.model.Token;
import com.example.services.ApiServicesImp;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import jakarta.servlet.http.HttpSession;
import org.apache.coyote.Response;
import org.json.JSONException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import java.net.URISyntaxException;
import java.security.SignatureException;
import java.util.Base64;

@org.springframework.stereotype.Controller
public class Controller {
    @Autowired
    private RestTemplate restTemplate;


    @Autowired
    public ApiServicesImp apiServicesImp;

//    Inicia el flujo de conexión con spotify
    @GetMapping("/login")
    public String login(){
        System.out.println("wu");
        return "redirect:"+apiServicesImp.GetAuthSpotify();
    }
//    Recupera el codigo de autorizacion
    @GetMapping("/callback")
//    @ResponseBody
    public String handleCallback(@RequestParam("code") String code) throws JSONException {
        apiServicesImp.setAuthorizationCode(code);
        String token = get();
        JSONObject jsonObject = new JSONObject(token);
        apiServicesImp.setAccess_token(jsonObject.getString("access_token"));
        System.out.println(apiServicesImp.getAccess_token());
        apiServicesImp.setRefresh_token(jsonObject.getString("refresh_token"));
//        System.out.println(apiServicesImp.getRefresh_token());
//        return token;
        return "redirect:http://localhost:3000/";
    }

    //Transfer the playback to the app
    @GetMapping("/transfer/{id}")
    @ResponseBody
    public String transfer(@PathVariable String id){
        String baseUrl = "https://api.spotify.com/v1/me/player";
        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("device_ids", id);
        HttpHeaders headers  = new HttpHeaders();
        headers.set("content-type","application/json");
        headers.set("Authorization", "Bearer "+apiServicesImp.getAccess_token());
        HttpEntity<MultiValueMap<String, String>> entity = new HttpEntity<>(params, headers);
        return restTemplate.exchange(baseUrl, HttpMethod.PUT, entity, String.class).getBody();
    }
//    //Start playing some song
//    @PostMapping("/play")
//    @ResponseBody
//    public String playSong(@RequestBody String uri){
//        String baseUrl = "https://api.spotify.com/v1/me/player/play";
//        MultiValueMap<String, String[]> params = new LinkedMultiValueMap<>();
//        String[] uris = new String[] {uri};
//        String[] positionMs = new String[] {"0"};
//        params.add("uris", uris);
//        params.add("position_ms", positionMs);
//        System.out.println(params);
//        HttpHeaders headers  = new HttpHeaders();
//        headers.set("content-type","application/json");
//        headers.set("Authorization", "Bearer "+apiServicesImp.getAccess_token());
//        System.out.println(headers);
//        HttpEntity<MultiValueMap<String, String[]>> entity = new HttpEntity<>(params, headers);
//        System.out.println(entity);
//        return restTemplate.exchange(baseUrl, HttpMethod.PUT, entity, String.class).getBody();
//    }//change volume
    @PostMapping("/volume/{volume}")
    @ResponseBody
    public String changeVolume(@PathVariable String volume){
        String baseUrl = "https://api.spotify.com/v1/me/player/volume?volume_percent=";
        HttpHeaders headers  = new HttpHeaders();
        headers.set("Authorization", "Bearer "+apiServicesImp.getAccess_token());
        MultiValueMap<String, String[]> params = new LinkedMultiValueMap<>();
        HttpEntity<MultiValueMap<String, String[]>> entity = new HttpEntity<>(params, headers);
        System.out.println(baseUrl+volume);
        return restTemplate.exchange(baseUrl+volume, HttpMethod.PUT, entity, String.class).getBody();
    }

    //Get access token
    @GetMapping("/getAt")
    @ResponseBody
    public String getAt(){
        if(apiServicesImp.getAccess_token()!=null){
            return apiServicesImp.getAccess_token();
        }
        else{
            return "no token";
        }
    }

//Check if the token is valid
    @GetMapping("/checkToken")
    @ResponseBody
    public String checkToken() throws JSONException {
        String token = apiServicesImp.getAccess_token();
        String apiUrl = "https://api.spotify.com/v1/me";
        //Here I must see if the token is expired or not
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer "+apiServicesImp.getAccess_token());
        HttpEntity<String> entity = new HttpEntity<>(headers);

        try {
            String response = restTemplate.exchange(apiUrl, HttpMethod.GET, entity, String.class).getBody();
            return "Token exists";
        }
        catch (HttpClientErrorException e) {
            if (e.getStatusCode() == HttpStatus.UNAUTHORIZED) {
                MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
                body.add("grant_type", "refresh_token");
                body.add("refresh_token", apiServicesImp.getRefresh_token());

                HttpHeaders header = new HttpHeaders();
                header.set("content-type", "application/x-www-form-urlencoded");header.set("Authorization", "Basic " + Base64.getEncoder().encodeToString((apiServicesImp.getClientId() + ":" + apiServicesImp.getClientSecret()).getBytes()));

                HttpEntity<MultiValueMap<String, String>> refreshEntity = new HttpEntity<>(body, header);
                String newToken = restTemplate.exchange("https://accounts.spotify.com/api/token", HttpMethod.POST, refreshEntity, String.class).getBody();
                System.out.println(newToken);
                JSONObject jsonObject = new JSONObject(newToken);
                apiServicesImp.setAccess_token(jsonObject.getString("access_token"));
                apiServicesImp.setRefresh_token(jsonObject.getString("refresh_token"));
                return "Token exists";
            }
            System.out.println("not found");
            return "No token found Error: " + e.getStatusCode();
        }
    }
//    Autenticar tu token, y si expiró entonces refrescarlo
    @PostMapping("/auth/spotify")
    @ResponseBody
    public String get(){
        final String tokenUrlString = "https://accounts.spotify.com/api/token";
        final String clientId = apiServicesImp.getClientId();
        final String clientSecret = apiServicesImp.getClientSecret();
        final String redirectUri = "http://localhost:8080/callback";
        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("grant_type", "authorization_code");
        params.add("code", apiServicesImp.getAuthorizationCode());
        params.add("redirect_uri", redirectUri);
        params.add("client_id", clientId);
        params.add("client_secret", clientSecret);
        HttpHeaders headers  = new HttpHeaders();
        headers.set("content-type","application/x-www-form-urlencoded");
        headers.set("Authorization", "Basic "+ Base64.getEncoder().encodeToString((clientId+":"+clientSecret).getBytes()));
        HttpEntity<MultiValueMap<String, String>> entity = new HttpEntity<>(params, headers);
        try {
            ResponseEntity<String> accessToken = restTemplate.exchange(tokenUrlString, HttpMethod.POST, entity, String.class);
            System.out.println("Bearer token "+accessToken);
            return accessToken.getBody();
        } catch (HttpClientErrorException e){
            return refreshToken(e);
        }
        catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al obtener el token: " + e.getMessage()).getBody();
        }
    }
    //GET /me/top/artists: Fetch the user’s top artists from Spotify and send it to the client.
    @GetMapping("/me/top/artists")
    @ResponseBody
    public String getTopArtists(){
        String baseUrl="https://api.spotify.com/v1/me/top/artists?limit=10";
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer "+apiServicesImp.getAccess_token());
        HttpEntity<String> entity = new HttpEntity<>(headers);

        try {
            ResponseEntity<String> response = restTemplate.exchange(baseUrl, HttpMethod.GET, entity, String.class);
            return response.getBody();
        }
        catch (HttpClientErrorException e){
            return refreshToken(e);
//            return "redirect:"+baseUrl;
        }
        catch (Exception e) {
            return "Error al obtener artistas: " + e.getMessage();
        }
    }
    //GET /artists/{id}: Fetch detailed information about a specific artist.
    @GetMapping("/artists/{id}")
    @ResponseBody
    public String getArtist(@PathVariable String id){
        System.out.println(id);
        String baseUrl="https://api.spotify.com/v1/artists/";
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer "+apiServicesImp.getAccess_token());
        HttpEntity<String> entity = new HttpEntity<>(headers);

        try {
            ResponseEntity<String> response = restTemplate.exchange(baseUrl+id, HttpMethod.GET, entity, String.class);
            return response.getBody();
        }
        catch (HttpClientErrorException e){
            return refreshToken(e);
//            return "redirect:"+baseUrl+id;
        }
        catch (Exception e) {
            return "Error al obtener artista: " + e.getMessage();
        }
    }//GET /playlist/{id}: Fetch detailed information about a specific playlist.
    @GetMapping("/playlist/{id}")
    @ResponseBody
    public String getPlaylist(@PathVariable String id){
        System.out.println(id);
        String baseUrl="https://api.spotify.com/v1/playlists/";
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer "+apiServicesImp.getAccess_token());
        HttpEntity<String> entity = new HttpEntity<>(headers);

        try {
            ResponseEntity<String> response = restTemplate.exchange(baseUrl+id, HttpMethod.GET, entity, String.class);
            return response.getBody();
        }
        catch (HttpClientErrorException e){
            return refreshToken(e);
//            return "redirect:"+baseUrl+id;
        }
        catch (Exception e) {
            return "Error al obtener artista: " + e.getMessage();
        }
    }//GET /track/{id}: Fetch detailed information about a specific track.
    @GetMapping("/track/{id}")
    @ResponseBody
    public String getTrack(@PathVariable String id){
        System.out.println(id);
        String baseUrl="https://api.spotify.com/v1/tracks/";
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer "+apiServicesImp.getAccess_token());
        HttpEntity<String> entity = new HttpEntity<>(headers);

        try {
            ResponseEntity<String> response = restTemplate.exchange(baseUrl+id, HttpMethod.GET, entity, String.class);
            return response.getBody();
        }
        catch (HttpClientErrorException e){
            return refreshToken(e);
//            return "redirect:"+baseUrl+id;
        }
        catch (Exception e) {
            return "Error al obtener artista: " + e.getMessage();
        }
    }
    //GET /albums/{id}: Fetch details about a specific album.
    @GetMapping("/albums/{id}")
    @ResponseBody
    public String getAlbum(@PathVariable String id){

        String baseUrl="https://api.spotify.com/v1/albums/";
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer "+apiServicesImp.getAccess_token());
        HttpEntity<String> entity = new HttpEntity<>(headers);

        try {
            ResponseEntity<String> response = restTemplate.exchange(baseUrl+id, HttpMethod.GET, entity, String.class);
            return response.getBody();
        }
        catch (HttpClientErrorException e){
            return refreshToken(e);
//            return "redirect:"+baseUrl+id;
        }
        catch (Exception e) {
            return "Error al obtener artista: " + e.getMessage();
        }
    }
    //Get popular songs of  an artist
    @GetMapping("/artists/{id}/top-tracks")
    @ResponseBody
    public String getArtistTopTracks(@PathVariable String id){
        System.out.println(id);
        String baseUrl="https://api.spotify.com/v1/artists/";
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer "+apiServicesImp.getAccess_token());
        HttpEntity<String> entity = new HttpEntity<>(headers);

        try {
            ResponseEntity<String> response = restTemplate.exchange(baseUrl+id+"/top-tracks", HttpMethod.GET, entity, String.class);
            return response.getBody();
        }
        catch (HttpClientErrorException e){
            return refreshToken(e);
//            return "redirect:"+baseUrl+id;
        }
        catch (Exception e) {
            return "Error al obtener albumes del artista: " + e.getMessage();
        }
    }
    //Get albums from an artist
    @GetMapping("/artists/{id}/albums")
    @ResponseBody
    public String getArtistAlbums(@PathVariable String id){
        System.out.println(id);
        String baseUrl="https://api.spotify.com/v1/artists/";
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer "+apiServicesImp.getAccess_token());
        HttpEntity<String> entity = new HttpEntity<>(headers);

        try {
            ResponseEntity<String> response = restTemplate.exchange(baseUrl+id+"/albums?limit=3", HttpMethod.GET, entity, String.class);
            return response.getBody();
        }
        catch (HttpClientErrorException e){
            return refreshToken(e);
//            return "redirect:"+baseUrl+id;
        }
        catch (Exception e) {
            return "Error al obtener albumes del artista: " + e.getMessage();
        }
    }
    //Get related artist from an artist
    //pendiente pq la api esta deprecada


    //GET /search: Allow search for artists, albums, or tracks.
    @GetMapping("/search")
    @ResponseBody
//    public String search(@RequestBody String termn){
    public String search(@RequestParam String termn){
        System.out.println(termn);
        String baseUrl="https://api.spotify.com/v1/search?q=";
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer "+apiServicesImp.getAccess_token());
        HttpEntity<String> entity = new HttpEntity<>(headers);

        try {
            ResponseEntity<String> response = restTemplate.exchange(baseUrl+termn+"&type=artist,album,track,playlist&limit=2", HttpMethod.GET, entity, String.class);
            return response.getBody();
        }
        catch (HttpClientErrorException e){
            return refreshToken(e);
//            return "redirect:"+baseUrl+termn+"&type=artist,album,track,playlist&limit=10";
        }
        catch (Exception e) {
            return "Error en la busqueda: " + e.getMessage();
        }
    }
//    metodo para refrescar token en muchas circunstancias
    private String refreshToken(HttpClientErrorException e){
        if (e.getStatusCode() == HttpStatus.BAD_REQUEST && e.getResponseBodyAsString().contains("invalid_grant")) {
            if (apiServicesImp.getRefresh_token() != null) {
                // Si tenemos un refresh_token, intentamos obtener un nuevo access_token
                MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
                body.add("grant_type", "refresh_token");
                body.add("refresh_token", apiServicesImp.getRefresh_token());

                HttpHeaders header = new HttpHeaders();
                header.set("content-type", "application/x-www-form-urlencoded");
                header.set("Authorization", "Basic " + Base64.getEncoder().encodeToString((apiServicesImp.getClientId() + ":" + apiServicesImp.getClientSecret()).getBytes()));

                HttpEntity<MultiValueMap<String, String>> refreshEntity = new HttpEntity<>(body, header);
                String refreshToken = restTemplate.exchange("https://accounts.spotify.com/api/token", HttpMethod.POST, refreshEntity, String.class).getBody();
                return refreshToken;
            }
            else{
                return "Token inválido";
            }
        }
        else{
            return "Error al obtener el token";
        }
    }
}
