package com.example.backend.domain.chatting.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import java.util.List;

@Getter
@Setter
public class CreateRoomRequest {

    @NotBlank(message = "방 제목은 필수입니다.")
    @Size(min = 2, max = 20, message = "방 제목은 2자 이상 20자 이하여야 합니다.")
    private String name;       // 방 제목

    // ❌ 삭제됨: private String hostUser;
    // (Controller에서 Principal.getName()으로 해결)

    private List<String> tags; // 태그 리스트

    @Min(value = 2, message = "최소 인원은 2명입니다.")
    @Max(value = 100, message = "최대 인원은 100명입니다.")
    private int maxUserCnt;    // 최대 인원
}