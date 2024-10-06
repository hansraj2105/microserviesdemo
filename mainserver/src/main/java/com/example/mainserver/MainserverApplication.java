package com.example.mainserver;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.server.EnableEurekaServer;

@SpringBootApplication
@EnableEurekaServer
public class MainserverApplication {

	public static void main(String[] args) {
		SpringApplication.run(MainserverApplication.class, args);
	}

}
