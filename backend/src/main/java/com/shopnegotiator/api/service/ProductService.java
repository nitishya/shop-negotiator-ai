package com.shopnegotiator.api.service;

import com.shopnegotiator.api.dto.ProductDto;
import com.shopnegotiator.api.exception.ResourceNotFoundException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.List;

/**
 * Mock implementation of ProductService.
 * Returns in-memory mock data — no database calls until integration phase.
 */
@Service
@Slf4j
public class ProductService {

    private static final List<ProductDto> MOCK_PRODUCTS = List.of(
        ProductDto.builder()
            .id(1L)
            .name("Sony WH-1000XM5 Wireless Headphones")
            .category("Audio")
            .description("Industry-leading noise canceling headphones with 30-hour battery life and multipoint connection.")
            .imageUrl("https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=500")
            .basePrice(29999.0)
            .build(),
        ProductDto.builder()
            .id(2L)
            .name("Samsung Galaxy S24 Ultra")
            .category("Smartphones")
            .description("200MP camera, S Pen included, Snapdragon 8 Gen 3 processor, 5000mAh battery.")
            .imageUrl("https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=500")
            .basePrice(134999.0)
            .build(),
        ProductDto.builder()
            .id(3L)
            .name("Apple MacBook Air M3")
            .category("Laptops")
            .description("Next-generation Apple M3 chip, 18-hour battery, fanless design, Liquid Retina display.")
            .imageUrl("https://images.unsplash.com/photo-1611186871525-81b7e6b2c8f0?w=500")
            .basePrice(124900.0)
            .build(),
        ProductDto.builder()
            .id(4L)
            .name("LG 55\" OLED C3 TV")
            .category("Televisions")
            .description("Self-lit OLED pixels, 120Hz refresh rate, Dolby Vision & Atmos, AI processor.")
            .imageUrl("https://images.unsplash.com/photo-1593784991095-a205069470b6?w=500")
            .basePrice(149990.0)
            .build()
    );

    public List<ProductDto> searchProducts(String query) {
        log.info("Searching products with query: '{}'", query);

        if (!StringUtils.hasText(query)) {
            return MOCK_PRODUCTS;
        }

        String lowerQuery = query.toLowerCase();
        return MOCK_PRODUCTS.stream()
                .filter(p -> p.getName().toLowerCase().contains(lowerQuery)
                        || p.getCategory().toLowerCase().contains(lowerQuery)
                        || p.getDescription().toLowerCase().contains(lowerQuery))
                .toList();
    }

    public ProductDto getProductById(Long id) {
        log.info("Fetching product with id: {}", id);
        return MOCK_PRODUCTS.stream()
                .filter(p -> p.getId().equals(id))
                .findFirst()
                .orElseThrow(() -> new ResourceNotFoundException("Product", id));
    }
}
