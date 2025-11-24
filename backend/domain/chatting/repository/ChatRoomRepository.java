package com.example.backend.domain.chatting.repository;

import com.example.backend.domain.chatting.entity.ChatRoomEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ChatRoomRepository extends JpaRepository<ChatRoomEntity, String> {

    // 1. 전체 목록 (최신순)
    List<ChatRoomEntity> findAllByOrderByCreatedDateDesc();

    // 2. ⭐️ [핵심] 특정 태그가 포함된 방 검색
    // "List<String> tags" 안에 입력받은 tag가 하나라도 포함되어 있으면 반환
    @Query("SELECT c FROM ChatRoomEntity c JOIN c.tags t WHERE t = :tag")
    List<ChatRoomEntity> findByTag(@Param("tag") String tag);

    // (심화) 여러 태그 중 하나라도 일치하면 검색 (OR 검색)
    List<ChatRoomEntity> findByTagsIn(List<String> tags);
}