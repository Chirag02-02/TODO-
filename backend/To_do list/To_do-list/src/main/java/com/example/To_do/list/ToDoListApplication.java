package com.example.To_do.list;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

// Entry point that bootstraps the Spring Boot todo application
@SpringBootApplication
public class ToDoListApplication {

	// Launches the application
	public static void main(String[] args) {
		SpringApplication.run(ToDoListApplication.class, args);
	}
}