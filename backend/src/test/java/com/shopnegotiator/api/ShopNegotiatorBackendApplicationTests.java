package com.shopnegotiator.api;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.boot.autoconfigure.orm.jpa.HibernateJpaAutoConfiguration;

@SpringBootTest(classes = ShopNegotiatorBackendApplication.class)
class ShopNegotiatorBackendApplicationTests {

    @Test
    void contextLoads() {
        // Verifies that the Spring application context loads successfully
    }
}
