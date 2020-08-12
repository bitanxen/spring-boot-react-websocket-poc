package com.bitanxen.app.model.chat;

import com.bitanxen.app.dto.chat.MessageType;
import com.bitanxen.app.model.user.User;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity(name = "TB_CHAT")
@Getter
@Setter
@NoArgsConstructor
public class Chat {

    @Id
    @GenericGenerator(name = "Application-Generic-Generator",
            strategy = "com.bitanxen.app.config.ApplicationGenericGenerator"
    )
    @GeneratedValue(generator = "Application-Generic-Generator")
    @Column(name = "CHAT_ID", nullable = false, unique = true)
    private String chatId;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "CHAT_ROOM", nullable = false, updatable = false, foreignKey = @ForeignKey(name = "FK_CHAT_CHAT_ROOM", value = ConstraintMode.CONSTRAINT))
    private ChatRoom chatRoom;

    @Lob
    @Column(name = "MESSAGE", nullable = false, updatable = false)
    private String message;

    @Enumerated(value = EnumType.STRING)
    @Column(name = "MESSAGE_TYPE", nullable = false, updatable = false)
    private MessageType messageType;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "chat")
    private Set<ChatReporter> reporters = new HashSet<>();

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "SENDER", nullable = false, updatable = false, foreignKey = @ForeignKey(name = "FK_CHAT_SENDER", value = ConstraintMode.CONSTRAINT))
    private User sender;

    @Column(name = "SENT_ON", nullable = false, updatable = false)
    private LocalDateTime sentOn;

    public Chat(ChatRoom chatRoom, String message, MessageType messageType, User sender) {
        this.chatRoom = chatRoom;
        this.message = message;
        this.messageType = messageType;
        this.sender = sender;
        this.sentOn = LocalDateTime.now();
    }
}
