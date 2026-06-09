package com.shopnegotiator.api.service;

import com.shopnegotiator.api.dto.ProductDto;
import com.shopnegotiator.api.dto.ShoppingSessionRequestDto;
import com.shopnegotiator.api.dto.ShoppingSessionResponseDto;
import com.shopnegotiator.api.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;

/**
 * Mock implementation of ShoppingSessionService.
 * Stores sessions in-memory (ConcurrentHashMap) to simulate session lifecycle.
 * Replace with JPA repository calls in integration phase.
 */
@Service
@Slf4j
@RequiredArgsConstructor
public class ShoppingSessionService {

    private final ProductService productService;

    // Thread-safe in-memory store for mock sessions
    private final Map<Long, ShoppingSessionResponseDto> sessionStore = new ConcurrentHashMap<>();
    private final AtomicLong sessionIdCounter = new AtomicLong(100L);

    public ShoppingSessionResponseDto createSession(ShoppingSessionRequestDto request) {
        log.info("Creating new shopping session for user: {}, product: {}",
                request.getUserId(), request.getProductId());

        // Validate product exists
        ProductDto product = productService.getProductById(request.getProductId());

        // Simulate AI negotiation: 12% off the base price
        double negotiatedPrice = product.getBasePrice() * 0.88;

        Long sessionId = sessionIdCounter.incrementAndGet();

        ShoppingSessionResponseDto session = ShoppingSessionResponseDto.builder()
                .id(sessionId)
                .userId(request.getUserId())
                .product(product)
                .status("NEGOTIATING")
                .negotiatedPrice(Math.round(negotiatedPrice * 100.0) / 100.0)
                .createdAt(LocalDateTime.now())
                .build();

        sessionStore.put(sessionId, session);
        log.info("Session created with id: {}. Target price: ₹{}", sessionId, session.getNegotiatedPrice());

        return session;
    }

    public ShoppingSessionResponseDto getSessionById(Long id) {
        log.info("Fetching session with id: {}", id);
        ShoppingSessionResponseDto session = sessionStore.get(id);
        if (session == null) {
            throw new ResourceNotFoundException("ShoppingSession", id);
        }
        return session;
    }
}
