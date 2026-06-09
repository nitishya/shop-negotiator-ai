package com.shopnegotiator.api.repository;

import com.shopnegotiator.api.entity.Recommendation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RecommendationRepository extends JpaRepository<Recommendation, Long> {
    Optional<Recommendation> findByProductId(Long productId);
}
