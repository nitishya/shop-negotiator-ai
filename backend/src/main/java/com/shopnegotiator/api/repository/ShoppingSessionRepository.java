package com.shopnegotiator.api.repository;

import com.shopnegotiator.api.entity.ShoppingSession;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ShoppingSessionRepository extends JpaRepository<ShoppingSession, Long> {
}
