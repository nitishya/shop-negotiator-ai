package com.shopnegotiator.api.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI shopNegotiatorOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Shop Negotiator AI - Backend API")
                        .description("""
                                REST APIs for the AI Shopping Negotiator Agent.
                                Provides endpoints for product search, AI-powered recommendations,
                                and negotiation session management.
                                """)
                        .version("v1.0.0")
                        .contact(new Contact()
                                .name("Nitish Kumar Yadav")
                                .email("nitishya143@gmail.com")
                                .url("https://github.com/nitishya"))
                        .license(new License()
                                .name("MIT License")
                                .url("https://opensource.org/licenses/MIT")));
    }
}
