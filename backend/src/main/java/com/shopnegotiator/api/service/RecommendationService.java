package com.shopnegotiator.api.service;

import com.shopnegotiator.api.dto.RecommendationRequestDto;
import com.shopnegotiator.api.dto.RecommendationResponseDto;
import com.shopnegotiator.api.exception.BadRequestException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Map;

/**
 * Mock implementation of RecommendationService.
 * Generates AI recommendation scores from in-memory logic.
 * No external AI API calls are made in this phase.
 */
@Service
@Slf4j
@RequiredArgsConstructor
public class RecommendationService {

    private final ProductService productService;

    // Mock AI recommendation data keyed by product ID
    private static final Map<Long, RecommendationResponseDto> MOCK_RECOMMENDATIONS = Map.of(
        1L, RecommendationResponseDto.builder()
            .id(1L)
            .productId(1L)
            .aiScore(92)
            .bestBuyingTime("Buy Now - Price is at a 6-month low")
            .rationale("Sony WH-1000XM5 is currently at its lowest price in the last 180 days. " +
                       "Competitor products are priced 15% higher. High AI confidence to buy immediately.")
            .build(),
        2L, RecommendationResponseDto.builder()
            .id(2L)
            .productId(2L)
            .aiScore(75)
            .bestBuyingTime("Wait 2 Weeks - Festive sale incoming")
            .rationale("Samsung Galaxy S24 Ultra price typically drops 10-12% during upcoming festive sales. " +
                       "Current price is near the 3-month average. Moderate AI confidence to wait.")
            .build(),
        3L, RecommendationResponseDto.builder()
            .id(3L)
            .productId(3L)
            .aiScore(88)
            .bestBuyingTime("Buy Now - Limited stock discount active")
            .rationale("MacBook Air M3 has a temporary cashback offer expiring soon. " +
                       "Price trend is upward over the last 60 days. High AI confidence to buy now.")
            .build(),
        4L, RecommendationResponseDto.builder()
            .id(4L)
            .productId(4L)
            .aiScore(60)
            .bestBuyingTime("Wait 1 Month - New model launch expected")
            .rationale("LG OLED C4 series is expected to launch next month, which will likely push " +
                       "C3 prices down by 15-20%. Lower AI confidence in current price value.")
            .build()
    );

    public RecommendationResponseDto getRecommendation(RecommendationRequestDto request) {
        Long productId = request.getProductId();
        log.info("Generating AI recommendation for product id: {}", productId);

        // Validate product exists first
        productService.getProductById(productId);

        RecommendationResponseDto recommendation = MOCK_RECOMMENDATIONS.get(productId);
        if (recommendation == null) {
            throw new BadRequestException("No recommendation available for product id: " + productId);
        }

        return recommendation;
    }
}
