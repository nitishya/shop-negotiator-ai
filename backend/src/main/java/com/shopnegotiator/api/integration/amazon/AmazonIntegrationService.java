package com.shopnegotiator.api.integration.amazon;

import com.shopnegotiator.api.dto.ProductDto;
import com.shopnegotiator.api.integration.ProductSearchService;
import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import io.github.resilience4j.retry.annotation.Retry;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.util.Collections;
import java.util.List;

@Service
@Slf4j
public class AmazonIntegrationService implements ProductSearchService {

    private final RestClient restClient;
    private final String baseUrl;
    private final String apiKey;

    public AmazonIntegrationService(
            RestClient restClient,
            @Value("${external.amazon.base-url}") String baseUrl,
            @Value("${external.amazon.api-key}") String apiKey) {
        this.restClient = restClient;
        this.baseUrl = baseUrl;
        this.apiKey = apiKey;
    }

    @Override
    @Retry(name = "shopping-api", fallbackMethod = "searchProductsFallback")
    @CircuitBreaker(name = "shopping-api", fallbackMethod = "searchProductsFallback")
    public List<ProductDto> searchProducts(String query) {
        log.info("Calling Amazon API to search for: {}", query);
        
        // This is a placeholder for the actual API call
        // In a real implementation, we would map the response to ProductDto
        /*
        return restClient.get()
                .uri(baseUrl + "/products?q=" + query)
                .header("x-api-key", apiKey)
                .retrieve()
                .body(AmazonSearchResponse.class)
                .toProductDtos();
        */
        
        return Collections.emptyList();
    }

    public List<ProductDto> searchProductsFallback(String query, Throwable t) {
        log.warn("Amazon API call failed for query '{}'. Falling back to empty list. Error: {}", query, t.getMessage());
        return Collections.emptyList();
    }
}
