package com.example.backend.domain.chatting.entity;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@EntityListeners(AuditingEntityListener.class)
@Table(name = "chat_message")
public class ChatMessageEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String roomId;   // 방 번호
    private String sender;   // 보낸 사람
    private String message;  // 메시지 내용

    @Enumerated(EnumType.STRING)
    private MessageType type; // ENTER, TALK, EXIT

    @CreatedDate
    @Column(updatable = false)
    private LocalDateTime sendTime; // 보낸 시간

    public enum MessageType {
        ENTER, TALK, EXIT
    }
}