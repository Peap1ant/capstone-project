package com.example.backend.domain.chatting.controller;

import com.example.backend.domain.chatting.dto.ChatRoomResponse;
import com.example.backend.domain.chatting.dto.CreateRoomRequest;
import com.example.backend.domain.chatting.entity.ChatRoomEntity;
import com.example.backend.domain.chatting.repository.ChatRoomRepository;
// 1. (추가) 인증 관련 임포트
import java.security.Principal;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity; // 2. (추가) ResponseEntity
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RequiredArgsConstructor
@RestController
@RequestMapping("/chat")
public class ChatRoomController {

    private final ChatRoomRepository chatRoomRepository;

    // 1. 오픈채팅방 생성 (보안 적용)
    @PostMapping("/room")
    public ResponseEntity<ChatRoomEntity> createRoom(
            @RequestBody CreateRoomRequest request,
            Principal principal // ⬅️ 3. (핵심) 인증 객체 주입
    ) {
        // 4. (보안) 클라이언트가 보낸 hostUser는 무시하고, 진짜 토큰 주인을 사용
        String currentUsername = principal.getName();

        ChatRoomEntity room = ChatRoomEntity.builder()
                .roomId(UUID.randomUUID().toString())
                .name(request.getName())
                .hostUser(currentUsername) // ⬅️ 여기서 진짜 주인을 설정
                .tags(request.getTags())
                .maxUserCnt(request.getMaxUserCnt())
                .build();

        ChatRoomEntity savedRoom = chatRoomRepository.save(room);

        return ResponseEntity.ok(savedRoom);
    }

    // 2. 모든 방 조회
    @GetMapping("/rooms")
    public ResponseEntity<List<ChatRoomResponse>> getAllRooms() {
        List<ChatRoomEntity> entities = chatRoomRepository.findAll();

        // Entity List -> DTO List 변환
        List<ChatRoomResponse> dtos = entities.stream()
                .map(ChatRoomResponse::fromEntity) // 정적 팩토리 메서드 활용
                .toList();

        return ResponseEntity.ok(dtos);
    }

    // 3. 태그로 방 검색 API
    @GetMapping("/rooms/search")
    public ResponseEntity<List<ChatRoomEntity>> searchRooms(@RequestParam String tag) {
        return ResponseEntity.ok(chatRoomRepository.findByTag(tag));
    }
}