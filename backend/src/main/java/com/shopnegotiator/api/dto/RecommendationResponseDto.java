package com.shopnegotiator.api.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class RecommendationResponseDto {
    private Long id;
    private Long productId;
    private Integer aiScore;
    private String bestBuyingTime;
    private String rationale;
}
