package com.bitanxen.app.config.socket;

import com.bitanxen.app.dto.chat.ChatMessage;
import com.bitanxen.app.dto.chat.MessageType;
import com.bitanxen.app.util.ChatUser;
import com.bitanxen.app.util.ChatUserDB;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.log4j.Log4j2;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

@Log4j2
public class SignalingSocketHandler extends TextWebSocketHandler {

    private final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {

        ChatMessage chatMessage = objectMapper.readValue(message.getPayload(), ChatMessage.class);

        if (MessageType.USER_ONLINE.equals(chatMessage.getMessageType())) {
            String username = chatMessage.getSender();
            ChatUser user = ChatUserDB.getInstance().getUser(username);

            WebSocketSession client = user.getSession();

            if (client == null || !client.isOpen()) {
                log.debug("RTC Login {} : OK", username);
                user.setSessionId(session.getId());
                user.setSession(session);
            } else {
                log.warn("User is not registered : KO", username);
            }

        }
    }
}
