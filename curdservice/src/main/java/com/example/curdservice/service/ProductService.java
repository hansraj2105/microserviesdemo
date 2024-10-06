package com.example.curdservice.service;

import com.example.curdservice.model.Product;
import com.example.curdservice.repo.ProductRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {
    @Autowired
    private ProductRepo productRepo;

    public List<Product> getAllProduct(){
        return productRepo.findAll();
    }
    public Product getById(Long id){
        return productRepo.findById(id).get();
    }
    public Product create(Product product) {
       return productRepo.save(product);
    }
    public Product update(Product product) {
        return productRepo.save(product);
    }
    public String  delete(Long id) {
         productRepo.deleteById(id);
         return "success";
    }
}
