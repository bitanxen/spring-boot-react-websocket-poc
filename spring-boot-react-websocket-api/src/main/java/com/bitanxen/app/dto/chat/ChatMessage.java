package com.bitanxen.app.dto.chat;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class ChatMessage {
    private String sender;
    private String chatGroup;
    private String content;
    private MessageType messageType;
}
