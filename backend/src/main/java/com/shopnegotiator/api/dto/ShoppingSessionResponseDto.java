package com.shopnegotiator.api.dto;

import lombok.Builder;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Builder
public class ShoppingSessionResponseDto {
    private Long id;
    private Long userId;
    private ProductDto product;
    private String status;
    private Double negotiatedPrice;
    private LocalDateTime createdAt;
}
