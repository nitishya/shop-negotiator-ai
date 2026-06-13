package com.shopnegotiator.api.dto;

import java.util.List;

public class UnifiedSearchResultDto {
    private List<PlatformResultDto> results;

    public UnifiedSearchResultDto() {}

    public UnifiedSearchResultDto(List<PlatformResultDto> results) {
        this.results = results;
    }

    public List<PlatformResultDto> getResults() {
        return results;
    }

    public void setResults(List<PlatformResultDto> results) {
        this.results = results;
    }
}
