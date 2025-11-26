package com.example.backend.domain.chatting.controller;

import com.example.backend.domain.chatting.dto.ChatMessage;
import com.example.backend.domain.chatting.entity.ChatMessageEntity;
import com.example.backend.domain.chatting.repository.ChatMessageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Controller;

import java.security.Principal; // 1. Principal 임포트

@RequiredArgsConstructor
@Controller
public class ChatController {

    private final SimpMessageSendingOperations messagingTemplate;
    private final ChatMessageRepository chatMessageRepository;
    // 2. 메서드 파라미터에 Principal 추가
    // (StompHandler가 JWT 검증 후 넣어준 인증 객체입니다.)
    @MessageMapping("chat/message")
    public void message(ChatMessage message, Principal principal) {

        // 3. [보안 핵심] 발신자 강제 설정
        // 클라이언트가 보낸 'sender'는 무시하고, 인증된 사용자 이름으로 덮어씌웁니다.
        // (principal이 null이라면 StompHandler 설정 문제 확인 필요)
        if (principal != null) {
            message.setSender(principal.getName());
        }

        // 4. 로직 처리
        switch (message.getType()) {
            case ENTER:
                message.setMessage(message.getSender() + "님이 입장하셨습니다.");
                break;
            case TALK:
                // 내용 없음 (그대로 전송)
                break;
            case EXIT:
                // (참고: 클라이언트가 직접 EXIT 메시지를 보내는 경우는 드뭅니다.
                // 보통 SessionDisconnectEvent에서 처리합니다.)
                message.setMessage(message.getSender() + "님이 퇴장하셨습니다.");
                break;
        }

        ChatMessageEntity chatEntity = ChatMessageEntity.builder()
                .roomId(message.getRoomId())
                .sender(principal.getName())
                .message(message.getMessage())
                .type(ChatMessageEntity.MessageType.valueOf(message.getType().name()))
                .build();

        chatMessageRepository.save(chatEntity);


        // 5. 전송
        messagingTemplate.convertAndSend("/sub/chat/room/" + message.getRoomId(), message);
    }
}