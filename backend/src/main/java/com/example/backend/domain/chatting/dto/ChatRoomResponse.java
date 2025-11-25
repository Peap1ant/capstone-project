package com.example.backend.domain.chatting.dto;

import com.example.backend.domain.chatting.entity.ChatRoomEntity;
import lombok.Getter;

import java.util.List;

@Getter // JSON으로 변환될 때 Getter 필요
public class ChatRoomResponse {

    private final String roomId;
    private final String name;
    private final String hostUser;
    private final List<String> tags;
    //private final int userCount; // (나중에 인원수 필요시 추가)

    // 1. 생성자는 데이터를 받아서 할당만 함 (UUID 생성 로직 제거)
    private ChatRoomResponse(String roomId, String name, String hostUser, List<String> tags) {
        this.roomId = roomId;
        this.name = name;
        this.hostUser = hostUser;
        this.tags = tags;
    }

    // 2. Entity -> DTO 변환을 위한 정적 팩토리 메서드
    public static ChatRoomResponse fromEntity(ChatRoomEntity entity) {
        return new ChatRoomResponse(
                entity.getRoomId(),
                entity.getName(),
                entity.getHostUser(),
                entity.getTags()
        );
    }
}