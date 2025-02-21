package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.web.client.RestTemplate;

@SpringBootApplication
@ComponentScan(basePackages = "com.example.controller," + "com.example.model," + "com.example.config,"+ "com.example.services")
public class Breakabletoy2Application {

	public static void main(String[] args) {
		SpringApplication.run(Breakabletoy2Application.class, args);
	}



}
