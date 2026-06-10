package com.shopnegotiator.api.integration.croma;

import com.shopnegotiator.api.integration.CouponService;
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
public class CromaIntegrationService implements CouponService {

    private final RestClient restClient;
    private final String baseUrl;
    private final String apiKey;

    public CromaIntegrationService(
            RestClient restClient,
            @Value("${external.croma.base-url}") String baseUrl,
            @Value("${external.croma.api-key}") String apiKey) {
        this.restClient = restClient;
        this.baseUrl = baseUrl;
        this.apiKey = apiKey;
    }

    @Override
    @Retry(name = "shopping-api", fallbackMethod = "getAvailableCouponsFallback")
    @CircuitBreaker(name = "shopping-api", fallbackMethod = "getAvailableCouponsFallback")
    public List<String> getAvailableCoupons(String productId) {
        log.info("Calling Croma API to fetch coupons for product: {}", productId);
        
        // This is a placeholder for the actual API call
        /*
        return restClient.get()
                .uri(baseUrl + "/coupons?product=" + productId)
                .header("X-Croma-Key", apiKey)
                .retrieve()
                .body(List.class);
        */
        
        return Collections.emptyList();
    }

    public List<String> getAvailableCouponsFallback(String productId, Throwable t) {
        log.warn("Croma API call failed for product '{}'. Returning empty list. Error: {}", productId, t.getMessage());
        return Collections.emptyList();
    }
}
