package com.shopnegotiator.api.integration.sarvamai;

import com.shopnegotiator.api.integration.SpeechToTextService;
import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import io.github.resilience4j.retry.annotation.Retry;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestClient;

@Service
@Slf4j
public class SarvamAiIntegrationService implements SpeechToTextService {

    private final RestClient restClient;
    private final String baseUrl;
    private final String apiKey;

    public SarvamAiIntegrationService(
            RestClient restClient,
            @Value("${external.sarvam.base-url}") String baseUrl,
            @Value("${external.sarvam.api-key}") String apiKey) {
        this.restClient = restClient;
        this.baseUrl = baseUrl;
        this.apiKey = apiKey;
    }

    @Override
    @Retry(name = "shopping-api", fallbackMethod = "transcribeAudioFallback")
    @CircuitBreaker(name = "shopping-api", fallbackMethod = "transcribeAudioFallback")
    public String transcribeAudio(Resource audioFile) {
        log.info("Calling Sarvam AI to transcribe audio file: {}", audioFile.getFilename());

        MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
        body.add("file", audioFile);
        body.add("model", "saaras:v3");
        body.add("mode", "transcribe");

        // This is a placeholder for the actual API call
        /*
        return restClient.post()
                .uri(baseUrl + "/speech-to-text")
                .header("api-subscription-key", apiKey)
                .contentType(MediaType.MULTIPART_FORM_DATA)
                .body(body)
                .retrieve()
                .body(String.class); // Adjust response type based on actual Sarvam API response structure
        */
        
        return "Transcription not available (mock)";
    }

    public String transcribeAudioFallback(Resource audioFile, Throwable t) {
        log.warn("Sarvam AI call failed for file '{}'. Returning empty transcription. Error: {}", audioFile.getFilename(), t.getMessage());
        return "";
    }
}
