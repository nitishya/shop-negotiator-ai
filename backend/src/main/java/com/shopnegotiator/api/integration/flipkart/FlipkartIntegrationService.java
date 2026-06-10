package com.shopnegotiator.api.integration.flipkart;

import com.shopnegotiator.api.integration.PriceComparisonService;
import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import io.github.resilience4j.retry.annotation.Retry;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.util.Collections;
import java.util.Map;

@Service
@Slf4j
public class FlipkartIntegrationService implements PriceComparisonService {

    private final RestClient restClient;
    private final String baseUrl;
    private final String apiKey;

    public FlipkartIntegrationService(
            RestClient restClient,
            @Value("${external.flipkart.base-url}") String baseUrl,
            @Value("${external.flipkart.api-key}") String apiKey) {
        this.restClient = restClient;
        this.baseUrl = baseUrl;
        this.apiKey = apiKey;
    }

    @Override
    @Retry(name = "shopping-api", fallbackMethod = "comparePricesFallback")
    @CircuitBreaker(name = "shopping-api", fallbackMethod = "comparePricesFallback")
    public Map<String, Double> comparePrices(String productId) {
        log.info("Calling Flipkart API to compare prices for product: {}", productId);
        
        // This is a placeholder for the actual API call
        /*
        return restClient.get()
                .uri(baseUrl + "/prices/" + productId)
                .header("Authorization", "Bearer " + apiKey)
                .retrieve()
                .body(Map.class);
        */
        
        return Collections.emptyMap();
    }

    public Map<String, Double> comparePricesFallback(String productId, Throwable t) {
        log.warn("Flipkart API call failed for product '{}'. Returning empty map. Error: {}", productId, t.getMessage());
        return Collections.emptyMap();
    }
}
