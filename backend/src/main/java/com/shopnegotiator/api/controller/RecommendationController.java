package com.shopnegotiator.api.controller;

import com.shopnegotiator.api.dto.RecommendationRequestDto;
import com.shopnegotiator.api.dto.RecommendationResponseDto;
import com.shopnegotiator.api.service.RecommendationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/recommendations")
@RequiredArgsConstructor
@Tag(name = "Recommendations", description = "AI-powered product recommendation endpoints")
public class RecommendationController {

    private final RecommendationService recommendationService;

    @PostMapping
    @Operation(
        summary = "Generate AI recommendation",
        description = "Returns an AI-powered recommendation for a given product including the optimal buying time, " +
                      "AI confidence score, and detailed rationale based on price trend analysis."
    )
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Recommendation generated successfully",
            content = @Content(schema = @Schema(implementation = RecommendationResponseDto.class))),
        @ApiResponse(responseCode = "400", description = "No recommendation available for product", content = @Content),
        @ApiResponse(responseCode = "404", description = "Product not found", content = @Content),
        @ApiResponse(responseCode = "422", description = "Validation failed", content = @Content)
    })
    public ResponseEntity<RecommendationResponseDto> getRecommendation(
            @Valid @RequestBody RecommendationRequestDto request) {

        RecommendationResponseDto recommendation = recommendationService.getRecommendation(request);
        return ResponseEntity.ok(recommendation);
    }
}
