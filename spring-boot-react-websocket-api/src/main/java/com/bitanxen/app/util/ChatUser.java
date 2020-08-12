package com.bitanxen.app.util;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class ChatUser {
    private String userId;
    private LocalDateTime heartbeatTime;
    private boolean online;

    public ChatUser(String userId) {
        this.userId = userId;
        heartbeatTime = LocalDateTime.now();
        online = true;
    }
}
