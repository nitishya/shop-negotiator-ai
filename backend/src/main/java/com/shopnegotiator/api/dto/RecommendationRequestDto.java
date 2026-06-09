package com.shopnegotiator.api.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class RecommendationRequestDto {

    @NotNull(message = "Product ID is required")
    private Long productId;
}
