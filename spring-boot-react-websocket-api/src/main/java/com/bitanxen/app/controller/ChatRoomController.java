package com.bitanxen.app.controller;

import com.bitanxen.app.config.security.SessionUser;
import com.bitanxen.app.dto.chat.CreateChatRoomDTO;
import com.bitanxen.app.dto.chat.UserChatRoomDTO;
import com.bitanxen.app.service.ChatRoomService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/chat")
public class ChatRoomController {

    private final ChatRoomService chatRoomService;

    public ChatRoomController(ChatRoomService chatRoomService) {
        this.chatRoomService = chatRoomService;
    }

    @PostMapping("/room")
    public ResponseEntity<UserChatRoomDTO> createChatRoom(@RequestBody CreateChatRoomDTO createChatRoom, Authentication authentication) {
        SessionUser sessionUser = (SessionUser) authentication.getPrincipal();
        return ResponseEntity.ok(chatRoomService.createChatRoom(createChatRoom, sessionUser));
    }

    @GetMapping("/room")
    public ResponseEntity<List<UserChatRoomDTO>> getChatRoom(Authentication authentication) {
        SessionUser sessionUser = (SessionUser) authentication.getPrincipal();
        return ResponseEntity.ok(chatRoomService.getUserChatRoom(sessionUser));
    }
}
