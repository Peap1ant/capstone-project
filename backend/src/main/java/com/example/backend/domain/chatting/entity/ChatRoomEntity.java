package com.example.backend.domain.chatting.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "chat_room")
@EntityListeners(AuditingEntityListener.class)
public class ChatRoomEntity {

    @Id
    private String roomId;
    private String name;      // 방 제목 (예: "축구 좋아하시는 분!")
    private String hostUser;  // 방장 (기존 user1 대신 방장 개념 도입)

    // 태그 리스트 저장
    // 별도의 테이블(chat_room_tags)이 자동 생성되어 관리됩니다.
    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "chat_room_tags", joinColumns = @JoinColumn(name = "room_id"))
    @Column(name = "tag_name")
    @Builder.Default
    private List<String> tags = new ArrayList<>();

    // (선택) 제한 인원
    private int maxUserCnt;

    @CreatedDate // 2. 생성 시간 자동 기록
    @Column(name = "created_date", updatable = false)
    private LocalDateTime createdDate;

}