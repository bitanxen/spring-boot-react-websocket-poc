package com.bitanxen.app.dto.chat;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateChatRoomDTO {
    private String roomName;
    private String roomDescription;
    private boolean group;
    private String targetUser;
}
