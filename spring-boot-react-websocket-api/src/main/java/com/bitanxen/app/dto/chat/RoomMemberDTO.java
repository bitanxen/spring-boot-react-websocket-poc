package com.bitanxen.app.dto.chat;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class RoomMemberDTO {
    private String userId;
    private String userFullName;
    private boolean admin;
    private boolean blocked;
}
