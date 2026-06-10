package com.shopnegotiator.api.integration;

import java.util.Map;

public interface PriceComparisonService {
    Map<String, Double> comparePrices(String productId);
}
