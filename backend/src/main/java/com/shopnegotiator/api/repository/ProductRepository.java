package com.shopnegotiator.api.repository;

import com.shopnegotiator.api.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByCategoryContainingIgnoreCaseOrNameContainingIgnoreCase(String category, String name);
}
