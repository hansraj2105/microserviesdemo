package com.example.userservice.repo;

import com.example.userservice.model.Users;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepo extends JpaRepository<Users,Long> {
    Users findByUsername(String username);
}
