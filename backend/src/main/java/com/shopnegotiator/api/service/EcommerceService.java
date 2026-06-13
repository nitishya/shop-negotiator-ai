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
 * EcommerceService simulates product price and availability lookups
 * across Amazon, Flipkart, Croma, and Myntra.
 *
 * In production: replace mock data generation with actual API calls
 * leveraging the existing RestClient integration patterns (e.g. AmazonIntegrationService).
 */
@Service
public class EcommerceService {

    private static final Logger log = LoggerFactory.getLogger(EcommerceService.class);
    private static final Random RNG = new Random();

    /**
     * Search for a product across all Ecommerce platforms.
     *
     * @param query product name / keyword to search
     * @return list of platform results, one per available platform
     */
    public List<PlatformResultDto> searchProduct(String query) {
        log.info("EcommerceService: searching for '{}' across Amazon, Flipkart, Croma, Myntra", query);

        List<PlatformResultDto> results = new ArrayList<>();

        // --- Amazon ---
        results.add(new PlatformResultDto(
                "Amazon",
                mockPrice(900, 3000),
                mockDeliveryTime(1440, 2880),   // minutes (1–2 days)
                mockRating(3.9, 4.8),
                mockAvailability(0.95),
                PlatformCategory.ECOMMERCE
        ));

        // --- Flipkart ---
        results.add(new PlatformResultDto(
                "Flipkart",
                mockPrice(850, 2800),
                mockDeliveryTime(1440, 4320),   // 1–3 days in minutes
                mockRating(3.7, 4.7),
                mockAvailability(0.90),
                PlatformCategory.ECOMMERCE
        ));

        // --- Croma ---
        results.add(new PlatformResultDto(
                "Croma",
                mockPrice(950, 3200),
                mockDeliveryTime(720, 2880),    // 12 hrs – 2 days in minutes
                mockRating(3.8, 4.6),
                mockAvailability(0.85),
                PlatformCategory.ECOMMERCE
        ));

        // --- Myntra (fashion / lifestyle accessories) ---
        results.add(new PlatformResultDto(
                "Myntra",
                mockPrice(700, 2500),
                mockDeliveryTime(2880, 5760),   // 2–4 days in minutes
                mockRating(3.5, 4.5),
                mockAvailability(0.80),
                PlatformCategory.ECOMMERCE
        ));

        log.debug("EcommerceService: returning {} results for '{}'", results.size(), query);
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
