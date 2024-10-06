package com.example.curdservice.controller;

import com.example.curdservice.model.Product;
import com.example.curdservice.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("rest")
@CrossOrigin("*")
public class ApiContoller {
    @Autowired
    private ProductService productService;

    @GetMapping("products")
    public ResponseEntity<?> getAll(){
        return new ResponseEntity<>(productService.getAllProduct(), HttpStatus.OK);
    }

    @GetMapping("product/{id}")
    public ResponseEntity<?> getAll(@PathVariable Long id){
        return new ResponseEntity<>(productService.getById(id), HttpStatus.OK);
    }

    @PostMapping("product")
    public ResponseEntity<?> create(@RequestBody Product product){
        return new ResponseEntity<>(productService.create(product), HttpStatus.CREATED);
    }

    @PutMapping("products")
    public ResponseEntity<?> update(@RequestBody Product product){
        return new ResponseEntity<>(productService.update(product), HttpStatus.OK);
    }

    @DeleteMapping("product/{id}")
    public ResponseEntity<?> update(@PathVariable Long id){
        return new ResponseEntity<>(productService.delete(id), HttpStatus.OK);
    }
}
