package com.shopnegotiator.api.dto;

public class PlatformRecommendationDto {
    private PlatformResultDto cheapestOption;
    private PlatformResultDto fastestDeliveryOption;
    private PlatformResultDto bestRatedOption;
    private PlatformResultDto bestOverallValue;

    public PlatformRecommendationDto() {}

    public PlatformRecommendationDto(
            PlatformResultDto cheapestOption,
            PlatformResultDto fastestDeliveryOption,
            PlatformResultDto bestRatedOption,
            PlatformResultDto bestOverallValue) {
        this.cheapestOption = cheapestOption;
        this.fastestDeliveryOption = fastestDeliveryOption;
        this.bestRatedOption = bestRatedOption;
        this.bestOverallValue = bestOverallValue;
    }

    public PlatformResultDto getCheapestOption() {
        return cheapestOption;
    }

    public void setCheapestOption(PlatformResultDto cheapestOption) {
        this.cheapestOption = cheapestOption;
    }

    public PlatformResultDto getFastestDeliveryOption() {
        return fastestDeliveryOption;
    }

    public void setFastestDeliveryOption(PlatformResultDto fastestDeliveryOption) {
        this.fastestDeliveryOption = fastestDeliveryOption;
    }

    public PlatformResultDto getBestRatedOption() {
        return bestRatedOption;
    }

    public void setBestRatedOption(PlatformResultDto bestRatedOption) {
        this.bestRatedOption = bestRatedOption;
    }

    public PlatformResultDto getBestOverallValue() {
        return bestOverallValue;
    }

    public void setBestOverallValue(PlatformResultDto bestOverallValue) {
        this.bestOverallValue = bestOverallValue;
    }
}
