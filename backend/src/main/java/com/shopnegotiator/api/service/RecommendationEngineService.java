package com.shopnegotiator.api.service;

import com.shopnegotiator.api.dto.PlatformRecommendationDto;
import com.shopnegotiator.api.dto.PlatformResultDto;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;

/**
 * RecommendationEngineService analyses a list of platform search results
 * and produces four recommendation slots:
 *
 *  - Cheapest option      : lowest price, only available platforms
 *  - Fastest delivery     : lowest deliveryTime (minutes), only available platforms
 *  - Best rated           : highest user rating, only available platforms
 *  - Best overall value   : highest composite score (see below)
 *
 * Composite "Overall Value" score formula:
 *   score = (rating * 15) - (normalised_price * 10) - (normalised_deliveryTime * 5)
 *
 * Normalisation is performed relative to the min/max values in the result set so that
 * wildly different delivery units (minutes for quick commerce vs. hours for ecommerce)
 * do not skew the score unfairly.
 */
@Service
public class RecommendationEngineService {

    private static final Logger log = LoggerFactory.getLogger(RecommendationEngineService.class);

    /**
     * Generate the four recommendation categories from a flat list of platform results.
     *
     * @param results all platform results (quick commerce + ecommerce combined)
     * @return {@link PlatformRecommendationDto} containing one winner per category
     */
    public PlatformRecommendationDto generateRecommendations(List<PlatformResultDto> results) {
        log.info("RecommendationEngineService: computing recommendations for {} platform results", results.size());

        // Only consider platforms where the product is actually available
        List<PlatformResultDto> available = results.stream()
                .filter(r -> Boolean.TRUE.equals(r.getAvailability()))
                .toList();

        if (available.isEmpty()) {
            log.warn("RecommendationEngineService: no available platforms — returning null recommendations");
            return new PlatformRecommendationDto(null, null, null, null);
        }

        PlatformResultDto cheapest = computeCheapest(available);
        PlatformResultDto fastest  = computeFastest(available);
        PlatformResultDto bestRated = computeBestRated(available);
        PlatformResultDto bestOverall = computeBestOverall(available);

        log.info("RecommendationEngineService: cheapest={}, fastest={}, bestRated={}, bestOverall={}",
                platformName(cheapest), platformName(fastest),
                platformName(bestRated), platformName(bestOverall));

        return new PlatformRecommendationDto(cheapest, fastest, bestRated, bestOverall);
    }

    // ----------------------------------------------------------------
    // Recommendation strategies
    // ----------------------------------------------------------------

    /** Lowest price wins. */
    private PlatformResultDto computeCheapest(List<PlatformResultDto> available) {
        return available.stream()
                .min(Comparator.comparingDouble(PlatformResultDto::getPrice))
                .orElse(null);
    }

    /** Lowest delivery time (in minutes) wins. */
    private PlatformResultDto computeFastest(List<PlatformResultDto> available) {
        return available.stream()
                .min(Comparator.comparingInt(PlatformResultDto::getDeliveryTime))
                .orElse(null);
    }

    /** Highest rating wins. */
    private PlatformResultDto computeBestRated(List<PlatformResultDto> available) {
        return available.stream()
                .max(Comparator.comparingDouble(PlatformResultDto::getRating))
                .orElse(null);
    }

    /**
     * Best Overall Value uses a normalised composite score:
     *
     *   score = (rating * 15) - (normPrice * 10) - (normDelivery * 5)
     *
     * normPrice    = (price - minPrice) / (maxPrice - minPrice)
     * normDelivery = (deliveryTime - minDelivery) / (maxDelivery - minDelivery)
     *
     * A higher score is better. Platforms with the cheapest, fastest, AND highest-rated
     * combination naturally float to the top.
     */
    private PlatformResultDto computeBestOverall(List<PlatformResultDto> available) {
        double minPrice    = available.stream().mapToDouble(PlatformResultDto::getPrice).min().orElse(0);
        double maxPrice    = available.stream().mapToDouble(PlatformResultDto::getPrice).max().orElse(1);
        double minDelivery = available.stream().mapToInt(PlatformResultDto::getDeliveryTime).min().orElse(0);
        double maxDelivery = available.stream().mapToInt(PlatformResultDto::getDeliveryTime).max().orElse(1);

        double priceRange    = maxPrice    - minPrice;
        double deliveryRange = maxDelivery - minDelivery;

        return available.stream()
                .max(Comparator.comparingDouble(r -> {
                    double normPrice    = priceRange    == 0 ? 0 : (r.getPrice()        - minPrice)    / priceRange;
                    double normDelivery = deliveryRange == 0 ? 0 : (r.getDeliveryTime() - minDelivery) / deliveryRange;
                    return (r.getRating() * 15) - (normPrice * 10) - (normDelivery * 5);
                }))
                .orElse(null);
    }

    // ----------------------------------------------------------------
    // Utility
    // ----------------------------------------------------------------

    private String platformName(PlatformResultDto dto) {
        return dto != null ? dto.getPlatformName() : "N/A";
    }
}
