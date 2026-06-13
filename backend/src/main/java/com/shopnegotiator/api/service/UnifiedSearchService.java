package com.shopnegotiator.api.service;

import com.shopnegotiator.api.dto.PlatformResultDto;
import com.shopnegotiator.api.dto.UnifiedSearchResultDto;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * UnifiedSearchService orchestrates product searches across both
 * Quick Commerce (Zepto, Blinkit, Instamart) and Ecommerce
 * (Amazon, Flipkart, Croma, Myntra) platforms, returning
 * a single aggregated result set.
 */
@Service
public class UnifiedSearchService {

    private static final Logger log = LoggerFactory.getLogger(UnifiedSearchService.class);

    private final QuickCommerceService quickCommerceService;
    private final EcommerceService ecommerceService;

    public UnifiedSearchService(QuickCommerceService quickCommerceService,
                                EcommerceService ecommerceService) {
        this.quickCommerceService = quickCommerceService;
        this.ecommerceService = ecommerceService;
    }

    /**
     * Performs a unified search for a product across all 7 platforms.
     *
     * @param query product name / search keyword
     * @return {@link UnifiedSearchResultDto} containing results from all platforms
     */
    public UnifiedSearchResultDto performUnifiedSearch(String query) {
        log.info("UnifiedSearchService: starting unified search for '{}'", query);

        List<PlatformResultDto> allResults = new ArrayList<>();

        // Aggregate Quick Commerce results
        List<PlatformResultDto> quickCommerceResults = quickCommerceService.searchProduct(query);
        allResults.addAll(quickCommerceResults);
        log.debug("UnifiedSearchService: {} Quick Commerce results fetched", quickCommerceResults.size());

        // Aggregate Ecommerce results
        List<PlatformResultDto> ecommerceResults = ecommerceService.searchProduct(query);
        allResults.addAll(ecommerceResults);
        log.debug("UnifiedSearchService: {} Ecommerce results fetched", ecommerceResults.size());

        log.info("UnifiedSearchService: unified search complete — {} total platform results", allResults.size());
        return new UnifiedSearchResultDto(allResults);
    }
}
