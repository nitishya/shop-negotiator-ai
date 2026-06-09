package com.shopnegotiator.api.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class ShoppingSessionRequestDto {

    @NotNull(message = "User ID is required")
    private Long userId;

    @NotNull(message = "Product ID is required")
    private Long productId;
}
