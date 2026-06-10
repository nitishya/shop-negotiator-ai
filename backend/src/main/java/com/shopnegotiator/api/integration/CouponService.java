package com.shopnegotiator.api.integration;

import java.util.List;

public interface CouponService {
    List<String> getAvailableCoupons(String productId);
}
