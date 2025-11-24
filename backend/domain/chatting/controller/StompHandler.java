package com.example.backend.domain.chatting.controller; // ⭐️ 본인의 config 패키지 경로로 수정

import com.example.backend.util.JWTUtil; // ⭐️ 본인의 JWTUtil 클래스 경로
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.MessageDeliveryException;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.messaging.support.MessageHeaderAccessor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;

import java.util.Collections;

@Slf4j
@Component
@RequiredArgsConstructor
@Order(Ordered.HIGHEST_PRECEDENCE + 99) // ⭐️ Spring Security의 인증 필터보다 나중에 실행
public class StompHandler implements ChannelInterceptor {

    // ⭐️ JWTUtil이 static 메서드를 사용하므로 직접 주입받을 필요가 없습니다.
    // private final JwtService jwtService;

    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel) {

        StompHeaderAccessor accessor = MessageHeaderAccessor.getAccessor(message, StompHeaderAccessor.class);

        // 1. STOMP 'CONNECT' 프레임일 때만 인증 처리
        if (StompCommand.CONNECT.equals(accessor.getCommand())) {

            // 2. STOMP 헤더에서 'Authorization' 토큰을 가져옴
            String authToken = accessor.getFirstNativeHeader("Authorization");
            log.info("STOMP - Trying to connect with token: {}", authToken);

            // 3. 토큰이 없거나 "Bearer "로 시작하지 않으면 예외
            if (authToken == null || !authToken.startsWith("Bearer ")) {
                log.warn("STOMP - Missing or invalid 'Authorization' header");
                throw new MessageDeliveryException("Missing or invalid 'Authorization' header");
            }

            // 4. "Bearer " 부분 제거
            String jwt = authToken.substring(7);

            // 5. JWT 토큰 검증 (JWTUtil 사용, AccessToken이므로 'true')
            // ⭐️ .isValid(token, isAccess) 메서드를 사용한다고 가정
            if (JWTUtil.isValid(jwt, true)) {
                log.info("STOMP - Token validation success");

                // 6. 토큰이 유효하면, Authentication 객체를 생성
                String username = JWTUtil.getUsername(jwt);
                String role = JWTUtil.getRole(jwt); // "ROLE_USER", "ROLE_ADMIN" 등

                // 7. Spring Security의 Authentication 객체 생성
                Authentication authentication = new UsernamePasswordAuthenticationToken(
                        username,
                        null,
                        Collections.singletonList(new SimpleGrantedAuthority(role))
                );

                // 8. ⭐️ [핵심] ⭐️
                // WebSocket 세션에 유저 인증 정보를 저장합니다.
                accessor.setUser(authentication);

            } else {
                log.warn("STOMP - Token validation failed");
                throw new MessageDeliveryException("Token validation failed");
            }
        }

        // CONNECT 프레임이 아니면 (예: SUBSCRIBE, SEND) 그냥 통과
        return message;
    }
}