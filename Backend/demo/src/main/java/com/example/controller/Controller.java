package com.example.controller;

import com.example.services.ApiServicesImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

@org.springframework.stereotype.Controller
public class Controller {

    private final RestTemplate restTemplate;

    @Autowired
    public Controller(RestTemplate restTemplate){
        this.restTemplate =  restTemplate;
    }
    @Autowired
    public ApiServicesImp apiServicesImp;

    @GetMapping("/hello")
    public ResponseEntity hello(){

        return ResponseEntity.ok().body("Hola");
    }
    @PostMapping("/auth/spotify")
    @ResponseBody
    public String get(@RequestParam("code") String code){
        System.out.println(code);
        //        return "Código de autorización recibido: " + code;
        if(apiServicesImp.getAccesstoken()!=null){
            return apiServicesImp.getAccesstoken();
        }else{
            return apiServicesImp.getToken(code);
        }

    }

    @GetMapping("/login")
    public String login(){
        return "redirect:"+apiServicesImp.GetAuthSpotify();
    }
    @GetMapping("/callback")
    @ResponseBody
    public String handleCallback(@RequestParam("code") String code) {
//        return "Código de autorización recibido: " + code;
        if(apiServicesImp.getAccesstoken()!=null){
            return apiServicesImp.getAccesstoken();
        }else{
            return apiServicesImp.getToken(code);
        }


    }
}
