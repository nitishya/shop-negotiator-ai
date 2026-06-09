package com.shopnegotiator.api.controller;

import com.shopnegotiator.api.dto.ProductDto;
import com.shopnegotiator.api.service.ProductService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/products")
@RequiredArgsConstructor
@Tag(name = "Products", description = "Product search and retrieval endpoints")
public class ProductController {

    private final ProductService productService;

    @GetMapping("/search")
    @Operation(
        summary = "Search products",
        description = "Search products by name, category, or description keyword. Returns all products if query is empty."
    )
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Products found successfully",
            content = @Content(schema = @Schema(implementation = ProductDto.class)))
    })
    public ResponseEntity<List<ProductDto>> searchProducts(
            @Parameter(description = "Search keyword (optional). Searches across name, category and description.")
            @RequestParam(required = false) String query) {

        List<ProductDto> products = productService.searchProducts(query);
        return ResponseEntity.ok(products);
    }

    @GetMapping("/{id}")
    @Operation(
        summary = "Get product by ID",
        description = "Retrieve full product details by its unique ID."
    )
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Product found",
            content = @Content(schema = @Schema(implementation = ProductDto.class))),
        @ApiResponse(responseCode = "404", description = "Product not found", content = @Content)
    })
    public ResponseEntity<ProductDto> getProductById(
            @Parameter(description = "The unique ID of the product", required = true)
            @PathVariable Long id) {

        ProductDto product = productService.getProductById(id);
        return ResponseEntity.ok(product);
    }
}
