package com.bitanxen.app.repository.chat;

import com.bitanxen.app.model.chat.ChatRoom;
import com.bitanxen.app.model.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ChatRoomRepository extends JpaRepository<ChatRoom, String> {

    @Query( "SELECT chatRoom FROM TB_CHATROOM chatRoom, TB_USERCHATROOM userChatRoom "+
            " WHERE chatRoom = userChatRoom.chatRoom "+
            "   AND userChatRoom.user = :user ")
    List<ChatRoom> getUserChatRooms(User user);

    @Query( "SELECT DISTINCT chatRoom FROM TB_CHATROOM chatRoom, TB_USERCHATROOM userChatRoom1, TB_USERCHATROOM userChatRoom2 "+
            " WHERE chatRoom = userChatRoom1.chatRoom "+
            "   AND chatRoom = userChatRoom2.chatRoom "+
            "   AND userChatRoom1.user IN (:users) "+
            "   AND userChatRoom2.user IN (:users) ")
    List<ChatRoom> getExistingRooms(List<User> users);
}
