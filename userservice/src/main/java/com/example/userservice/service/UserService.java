package com.example.userservice.service;

import com.example.userservice.config.JwtService;
import com.example.userservice.model.Users;
import com.example.userservice.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class UserService {
    @Autowired
    private UserRepo userRepo;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtService jwtService;
    public String  registration(Users users) {
        users.setPassword(passwordEncoder.encode(users.getPassword()));
        userRepo.save(users);
        return "success";
    }

    public Object login(String username, String password) {
        Map<String,String> response=new HashMap<>();
        try {
            Authentication authenticate = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));

           if( authenticate.isAuthenticated()){
               response.put("token",jwtService.buildToken(username));
               response.put("status","success");
              return response;
           }
        }catch (Exception e){
            response.put("message",e.getMessage());
        }
        response.put("status","fail");
        return response;
    }

    public Boolean validation(String token) {
        try {

        boolean tokenExpired = jwtService.isTokenExpired(token);
        if(!tokenExpired){
            String s = jwtService.extractUsername(token);
            Users byUsername = userRepo.findByUsername(s);
            return byUsername!=null;
        }}
        catch (Exception e){

        }
        return false;
    }
}
