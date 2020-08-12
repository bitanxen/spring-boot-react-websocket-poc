package com.bitanxen.app.dto.chat;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@Builder
public class UserChatRoomDTO {
    private String roomId;
    private String roomName;
    private String roomDescription;
    private boolean group;
    private boolean enabled;
    private boolean deleted;
    private List<RoomMemberDTO> roomMembers;
    private String targetUserId;
    private String createdBy;
    private String createdByName;
    private LocalDateTime createdOn;
    private String updatedBy;
    private String updatedByName;
    private LocalDateTime updatedOn;
}
