package in.bitanxen.app.dto.chat;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChatMessage {
    private String sender;
    private String chatGroup;
    private String content;
    private MessageType messageType;
}