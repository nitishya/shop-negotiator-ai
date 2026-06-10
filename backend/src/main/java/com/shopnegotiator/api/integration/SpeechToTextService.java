package com.shopnegotiator.api.integration;

import org.springframework.core.io.Resource;

public interface SpeechToTextService {
    String transcribeAudio(Resource audioFile);
}
