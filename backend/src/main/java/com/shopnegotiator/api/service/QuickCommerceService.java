package com.shopnegotiator.api.service;

import com.shopnegotiator.api.dto.PlatformCategory;
import com.shopnegotiator.api.dto.PlatformResultDto;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

/**
 * QuickCommerceService simulates product price and availability lookups
 * across Zepto, Blinkit, and Instamart.
 *
 * In production: replace the mock data generation with actual API calls
 * (e.g. using RestClient + circuit breaker, like the existing Amazon/Flipkart layers).
 */
@Service
public class QuickCommerceService {

    private static final Logger log = LoggerFactory.getLogger(QuickCommerceService.class);
    private static final Random RNG = new Random();

    /**
     * Search for a product across all Quick Commerce platforms.
     *
     * @param query product name / keyword to search
     * @return list of platform results, one per available platform
     */
    public List<PlatformResultDto> searchProduct(String query) {
        log.info("QuickCommerceService: searching for '{}' across Zepto, Blinkit, Instamart", query);

        List<PlatformResultDto> results = new ArrayList<>();

        // --- Zepto ---
        results.add(new PlatformResultDto(
                "Zepto",
                mockPrice(800, 2000),     // INR range
                mockDeliveryTime(8, 15),  // minutes
                mockRating(3.8, 4.7),
                mockAvailability(0.85),
                PlatformCategory.QUICK_COMMERCE
        ));

        // --- Blinkit ---
        results.add(new PlatformResultDto(
                "Blinkit",
                mockPrice(750, 2100),
                mockDeliveryTime(10, 20),
                mockRating(3.9, 4.8),
                mockAvailability(0.90),
                PlatformCategory.QUICK_COMMERCE
        ));

        // --- Instamart ---
        results.add(new PlatformResultDto(
                "Instamart",
                mockPrice(820, 1950),
                mockDeliveryTime(12, 25),
                mockRating(3.6, 4.6),
                mockAvailability(0.80),
                PlatformCategory.QUICK_COMMERCE
        ));

        log.debug("QuickCommerceService: returning {} results for '{}'", results.size(), query);
        return results;
    }

    // ----------------------------------------------------------------
    // Private helpers
    // ----------------------------------------------------------------

    private Double mockPrice(double min, double max) {
        return Math.round((min + (max - min) * RNG.nextDouble()) * 100.0) / 100.0;
    }

    private Integer mockDeliveryTime(int minMinutes, int maxMinutes) {
        return minMinutes + RNG.nextInt(maxMinutes - minMinutes + 1);
    }

    private Double mockRating(double min, double max) {
        return Math.round((min + (max - min) * RNG.nextDouble()) * 10.0) / 10.0;
    }

    private Boolean mockAvailability(double probabilityTrue) {
        return RNG.nextDouble() < probabilityTrue;
    }
}
