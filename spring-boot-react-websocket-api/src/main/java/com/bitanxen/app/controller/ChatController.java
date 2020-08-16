package com.bitanxen.app.controller;

import com.bitanxen.app.dto.chat.ChatMessage;
import com.bitanxen.app.util.ChatUser;
import com.bitanxen.app.util.ChatUserDB;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.UUID;

@RestController
public class ChatController {

    private final SimpMessagingTemplate simpMessagingTemplate;

    public ChatController(SimpMessagingTemplate simpMessagingTemplate) {
        this.simpMessagingTemplate = simpMessagingTemplate;
    }

    @MessageMapping("/chat.register")
    public ChatMessage register(@Payload ChatMessage chatMessage, SimpMessageHeaderAccessor headerAccessor) {
        headerAccessor.getSessionAttributes().put("username", chatMessage.getSender());
        ChatUserDB.getInstance().setUser(chatMessage.getSender(), true);
        return chatMessage;
    }

    @MessageMapping("/chat/{group}")
    public void sendMessage(@DestinationVariable String group, @Payload ChatMessage chatMessage) {
        chatMessage.setMessageId(UUID.randomUUID().toString());
        simpMessagingTemplate.convertAndSend("/topic/message/"+group, chatMessage);
    }

    @Scheduled(fixedRate = 5000)
    public void informClient() {
        Collection<ChatUser> users = ChatUserDB.getInstance().getUsers();
        simpMessagingTemplate.convertAndSend("/topic/public", users);
    }

    @Scheduled(fixedRate = 3000)
    public void invalidateSession() {
        Collection<ChatUser> users = ChatUserDB.getInstance().getUsers();
        users.parallelStream().filter(u -> u.getHeartbeatTime().isBefore(LocalDateTime.now().minusMinutes(2)))
                .forEach(chatUser -> {
                    ChatUserDB.getInstance().setUser(chatUser.getUserId(), false);
                });
    }
}
