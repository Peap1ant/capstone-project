package com.example.backend.config;

import com.example.backend.domain.chatting.controller.StompHandler;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.ChannelRegistration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
@RequiredArgsConstructor
public class WebSockConfig implements WebSocketMessageBrokerConfigurer {

    private final StompHandler stompHandler;

    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {
        config.enableSimpleBroker("/sub");
        config.setApplicationDestinationPrefixes("/pub");
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        // 1. 웹(React)용: SockJS 사용 (http://.../ws-sockjs)

        // 2. 앱(React Native)용: 순수 WebSocket (ws://.../ws-stomp)
        // ⭐️ .withSockJS()를 절대 붙이지 마세요!
        registry.addEndpoint("/ws-stomp")
                .setAllowedOriginPatterns("*");
    }

    @Override
    public void configureClientInboundChannel(ChannelRegistration registration) {
        // 방금 만든 StompHandler를 인터셉터로 등록하여
        // STOMP CONNECT 요청 시 JWT 인증을 수행하도록 합니다.
        registration.interceptors(stompHandler);
    }
}