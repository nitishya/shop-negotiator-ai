package com.shopnegotiator.api.controller;

import com.shopnegotiator.api.dto.ShoppingSessionRequestDto;
import com.shopnegotiator.api.dto.ShoppingSessionResponseDto;
import com.shopnegotiator.api.service.ShoppingSessionService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/sessions")
@RequiredArgsConstructor
@Tag(name = "Shopping Sessions", description = "Negotiation session lifecycle management")
public class ShoppingSessionController {

    private final ShoppingSessionService shoppingSessionService;

    @PostMapping
    @Operation(
        summary = "Create a new negotiation session",
        description = "Initiates a new AI shopping negotiation session for a specific user and product. " +
                      "The AI agent calculates a target negotiated price and sets the session status to NEGOTIATING."
    )
    @ApiResponses(value = {
        @ApiResponse(responseCode = "201", description = "Session created successfully",
            content = @Content(schema = @Schema(implementation = ShoppingSessionResponseDto.class))),
        @ApiResponse(responseCode = "404", description = "Product or User not found", content = @Content),
        @ApiResponse(responseCode = "422", description = "Validation failed", content = @Content)
    })
    public ResponseEntity<ShoppingSessionResponseDto> createSession(
            @Valid @RequestBody ShoppingSessionRequestDto request) {

        ShoppingSessionResponseDto session = shoppingSessionService.createSession(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(session);
    }

    @GetMapping("/{id}")
    @Operation(
        summary = "Get session by ID",
        description = "Retrieve the current state and details of a negotiation session by its unique ID."
    )
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Session found",
            content = @Content(schema = @Schema(implementation = ShoppingSessionResponseDto.class))),
        @ApiResponse(responseCode = "404", description = "Session not found", content = @Content)
    })
    public ResponseEntity<ShoppingSessionResponseDto> getSessionById(
            @Parameter(description = "The unique ID of the shopping session", required = true)
            @PathVariable Long id) {

        ShoppingSessionResponseDto session = shoppingSessionService.getSessionById(id);
        return ResponseEntity.ok(session);
    }
}
