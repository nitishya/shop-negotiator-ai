package com.shopnegotiator.api.dto;

public class PlatformResultDto {
    private String platformName;
    private Double price;
    private Integer deliveryTime; // In minutes for Quick Commerce, or hours/days for Ecommerce
    private Double rating;
    private Boolean availability;
    private PlatformCategory category;

    public PlatformResultDto() {}

    public PlatformResultDto(String platformName, Double price, Integer deliveryTime, Double rating, Boolean availability, PlatformCategory category) {
        this.platformName = platformName;
        this.price = price;
        this.deliveryTime = deliveryTime;
        this.rating = rating;
        this.availability = availability;
        this.category = category;
    }

    public String getPlatformName() {
        return platformName;
    }

    public void setPlatformName(String platformName) {
        this.platformName = platformName;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public Integer getDeliveryTime() {
        return deliveryTime;
    }

    public void setDeliveryTime(Integer deliveryTime) {
        this.deliveryTime = deliveryTime;
    }

    public Double getRating() {
        return rating;
    }

    public void setRating(Double rating) {
        this.rating = rating;
    }

    public Boolean getAvailability() {
        return availability;
    }

    public void setAvailability(Boolean availability) {
        this.availability = availability;
    }

    public PlatformCategory getCategory() {
        return category;
    }

    public void setCategory(PlatformCategory category) {
        this.category = category;
    }
}
