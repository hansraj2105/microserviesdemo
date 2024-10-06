package com.example.curdservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
public class CurdserviceApplication {

	public static void main(String[] args) {
		SpringApplication.run(CurdserviceApplication.class, args);
	}

}
