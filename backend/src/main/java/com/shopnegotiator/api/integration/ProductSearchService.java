package com.shopnegotiator.api.integration;

import com.shopnegotiator.api.dto.ProductDto;
import java.util.List;

public interface ProductSearchService {
    List<ProductDto> searchProducts(String query);
}
