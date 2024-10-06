package com.example.userservice.config;

import com.example.userservice.model.Users;
import com.example.userservice.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserDetailServiceImpl implements UserDetailsService {
    @Autowired
    private UserRepo userRepo;
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Users byUsername = userRepo.findByUsername(username);
        if(byUsername==null)
            throw new UsernameNotFoundException("User Not found");
        return User.builder().username(byUsername.getUsername()).password(byUsername.getPassword()).roles(byUsername.getRole().toString()).build();
    }
}
