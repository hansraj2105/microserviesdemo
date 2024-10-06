package com.example.userservice.contoller;

import com.example.userservice.model.Users;
import com.example.userservice.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("user")
@CrossOrigin("*")
public class ApiContoller {
    @Autowired
    private UserService userService;
    @PostMapping("registration")
    public ResponseEntity registration(@RequestBody Users users) {
        return new ResponseEntity<>(userService.registration(users), HttpStatus.CREATED);
    }
    @PostMapping("login")
    public ResponseEntity login(@RequestParam("username") String username, @RequestParam("pasword") String password) {
        return new ResponseEntity<>(userService.login(username,password), HttpStatus.OK);
    }
    @GetMapping("validation")
    public Boolean validation(@RequestParam("token") String token) {
        return userService.validation(token);
    }
}
