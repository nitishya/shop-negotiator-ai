package com.shopnegotiator.api.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ProductDto {
    private Long id;
    private String name;
    private String category;
    private String description;
    private String imageUrl;
    private Double basePrice;
}
