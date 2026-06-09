package com.shopnegotiator.api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.boot.autoconfigure.orm.jpa.HibernateJpaAutoConfiguration;

/**
 * Main entry point for Shop Negotiator AI Backend.
 * JPA/DataSource auto-configuration is excluded during the mock phase.
 * Remove the 'exclude' list when integrating with a real PostgreSQL database.
 */
@SpringBootApplication(exclude = {
    DataSourceAutoConfiguration.class,
    HibernateJpaAutoConfiguration.class
})
public class ShopNegotiatorBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(ShopNegotiatorBackendApplication.class, args);
    }
}
