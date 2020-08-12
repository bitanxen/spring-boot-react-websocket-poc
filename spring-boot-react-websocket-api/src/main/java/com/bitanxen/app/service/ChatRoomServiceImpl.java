package com.bitanxen.app.service;

import com.bitanxen.app.config.security.SessionUser;
import com.bitanxen.app.exception.ChatRoomException;
import com.bitanxen.app.repository.chat.ChatRoomRepository;
import com.bitanxen.app.dto.chat.CreateChatRoomDTO;
import com.bitanxen.app.dto.chat.RoomMemberDTO;
import com.bitanxen.app.dto.chat.UserChatRoomDTO;
import com.bitanxen.app.model.chat.ChatRoom;
import com.bitanxen.app.model.chat.UserChatRoom;
import com.bitanxen.app.model.user.User;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@Log4j2
public class ChatRoomServiceImpl implements ChatRoomService {

    private final AuthenticationService authenticationService;

    private final ChatRoomRepository chatRoomRepository;

    public ChatRoomServiceImpl(AuthenticationService authenticationService, ChatRoomRepository chatRoomRepository) {
        this.authenticationService = authenticationService;
        this.chatRoomRepository = chatRoomRepository;
    }

    @Override
    public UserChatRoomDTO createChatRoom(CreateChatRoomDTO createChatRoom, SessionUser user) {
        User createdBy = authenticationService.getUser(user.getUserId());
        ChatRoom chatRoom = new ChatRoom(createChatRoom.getRoomName(), createChatRoom.getRoomDescription(),
                createChatRoom.isGroup(), createdBy);
        if(!createChatRoom.isGroup()) {
            User otherUser = authenticationService.getUser(createChatRoom.getTargetUser());

            if(otherUser.getUserId().equals(createdBy.getUserId())) {
                throw new ChatRoomException("Cannot add self as member of Chat Room");
            }

            List<ChatRoom> existingRoom = chatRoomRepository.getExistingRooms(Arrays.asList(createdBy, otherUser));
            if(!existingRoom.isEmpty()) {
                throw new ChatRoomException("Room Exist Between You and "+otherUser.getFullName());
            }

            chatRoom.addUser(otherUser, true);
        }
        return convertChatRoomIntoDTO(chatRoomRepository.save(chatRoom), createdBy);
    }

    @Override
    public List<UserChatRoomDTO> getUserChatRoom(SessionUser sessionUser) {
        User user = authenticationService.getUser(sessionUser.getUserId());
        List<ChatRoom> userChatRooms = chatRoomRepository.getUserChatRooms(user);
        return userChatRooms.stream()
                .map(chatRoom -> convertChatRoomIntoDTO(chatRoom, user))
                .collect(Collectors.toList());
    }

    private UserChatRoomDTO convertChatRoomIntoDTO(ChatRoom chatRoom, User user) {
        if(chatRoom == null)
            return null;

        boolean isGroup = chatRoom.isGroup();
        User createdBy = chatRoom.getCreatedBy();
        User updatedBy = chatRoom.getUpdatedBy();
        String targetUserId = null;
        String roomName = chatRoom.getRoomName();
        String roomDescription = chatRoom.getRoomDescription();

        if(!isGroup) {
            UserChatRoom userChatRoom = chatRoom.getUsers()
                    .stream()
                    .filter(ucr -> !ucr.getUser().getUserId().equals(user.getUserId()))
                    .findFirst().orElse(null);
            if(userChatRoom != null) {
                roomName = userChatRoom.getUser().getFullName();
                roomDescription = roomName;
                targetUserId = userChatRoom.getUser().getUserId();
            }
        }

        return UserChatRoomDTO.builder()
                .roomId(chatRoom.getChatRoomId())
                .roomName(roomName)
                .roomDescription(roomDescription)
                .group(isGroup)
                .enabled(chatRoom.isEnabled())
                .deleted(chatRoom.isDeleted())
                .roomMembers(chatRoom.getUsers().stream().map(this::convertUserChatRoom).collect(Collectors.toList()))
                .targetUserId(targetUserId)
                .createdBy(createdBy.getUserId())
                .createdByName(createdBy.getFullName())
                .createdOn(chatRoom.getCreatedOn())
                .updatedBy(updatedBy != null ? updatedBy.getUserId() : null)
                .updatedByName(updatedBy != null ? updatedBy.getFullName() : null)
                .updatedOn(chatRoom.getUpdatedOn())
                .build();
    }

    private RoomMemberDTO convertUserChatRoom(UserChatRoom userChatRoom) {
        if(userChatRoom == null) {
            return null;
        }

        return RoomMemberDTO.builder()
                .userId(userChatRoom.getUser().getUserId())
                .userFullName(userChatRoom.getUser().getFullName())
                .blocked(userChatRoom.isBlocked())
                .admin(userChatRoom.isAdmin())
                .build();
    }

}
