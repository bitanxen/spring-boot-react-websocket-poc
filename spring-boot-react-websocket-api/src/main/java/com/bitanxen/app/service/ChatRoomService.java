package com.bitanxen.app.service;

import com.bitanxen.app.config.security.SessionUser;
import com.bitanxen.app.dto.chat.CreateChatRoomDTO;
import com.bitanxen.app.dto.chat.UserChatRoomDTO;

import java.util.List;

public interface ChatRoomService {
    UserChatRoomDTO createChatRoom(CreateChatRoomDTO chatRoom, SessionUser user);
    List<UserChatRoomDTO> getUserChatRoom(SessionUser sessionUser);
}
