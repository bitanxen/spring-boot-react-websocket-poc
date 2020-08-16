package com.bitanxen.app.util;

import lombok.Getter;
import lombok.Setter;
import org.springframework.web.socket.WebSocketSession;

import java.time.LocalDateTime;

@Getter
@Setter
public class ChatUser {
    private String userId;
    private LocalDateTime heartbeatTime;
    private WebSocketSession session;
    private String sessionId;
    private boolean online;

    public ChatUser(String userId) {
        this.userId = userId;
        heartbeatTime = LocalDateTime.now();
        online = true;
    }
}
