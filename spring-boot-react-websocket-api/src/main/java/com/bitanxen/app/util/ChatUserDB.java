package com.bitanxen.app.util;

import org.springframework.web.socket.WebSocketSession;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

public class ChatUserDB {
    private static ChatUserDB instance;
    private final Map<String, ChatUser> users;

    private ChatUserDB() {
        users = new HashMap<>();
    }

    public static synchronized ChatUserDB getInstance() {
        if(instance == null) {
            instance = new ChatUserDB();
        }
        return instance;
    }

    public Collection<ChatUser> getUsers() {
        return users.values();
    }

    public ChatUser getUser(String id) {
        return users.get(id);
    }

    public void setUser(String userName, boolean isOnline) {
        if(users.containsKey(userName)) {
            ChatUser chatUser = users.get(userName);
            chatUser.setHeartbeatTime(LocalDateTime.now());
            chatUser.setOnline(isOnline);
        } else {
            users.put(userName, new ChatUser(userName));
        }
    }

    public void setUserRTC(String userName, WebSocketSession session, String sessionId) {
        if(users.containsKey(userName)) {
            ChatUser chatUser = users.get(userName);
            chatUser.setSession(session);
            chatUser.setSessionId(sessionId);
        }
    }
}
