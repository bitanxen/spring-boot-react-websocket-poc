package com.bitanxen.app.dto.chat;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class ChatMessage {
    private String messageId;
    private String sender;
    private String chatGroup;
    private String content;
    private Object streamData;
    private MessageType messageType;
}
