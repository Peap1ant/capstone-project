package com.example.backend.domain.chatting.repository;

import com.example.backend.domain.chatting.entity.ChatMessageEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ChatMessageRepository extends JpaRepository<ChatMessageEntity, Long> {
    // 특정 방의 메시지 리스트 조회 (시간순 정렬)
    List<ChatMessageEntity> findByRoomIdOrderBySendTimeAsc(String roomId);
}