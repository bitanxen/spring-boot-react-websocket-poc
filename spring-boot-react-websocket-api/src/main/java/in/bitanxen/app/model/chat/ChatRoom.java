package in.bitanxen.app.model.chat;

import in.bitanxen.app.model.user.User;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity(name = "TB_CHATROOM")
@Getter
@Setter
@NoArgsConstructor
public class ChatRoom {

    @Id
    @GeneratedValue
    @Column(name = "CHAT_ROOM_ID", nullable = false, unique = true)
    private String chatRoomId;

    @Column(name = "ROOM_NAME", nullable = false)
    private String roomName;

    @Column(name = "ROOM_DESCRIPTION")
    private String roomDescription;

    @Column(name = "ROOM_LOGO")
    private String roomLogo;

    @Column(name = "ISGROUP")
    private boolean group;

    @Column(name = "ENABLED")
    private boolean enabled;

    @Column(name = "DELETED")
    private boolean deleted;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "chatRoom")
    private Set<Chat> chats = new HashSet<>();

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "chatRoom")
    private Set<ChatRoomAdmin> chatRoomAdmins = new HashSet<>();

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "chatRoom")
    private Set<UserChatRoom> users = new HashSet<>();

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "CREATED_BY", nullable = false, foreignKey = @ForeignKey(name = "FK_CHATROOM_CREATED_BY", value = ConstraintMode.CONSTRAINT))
    private User createdBy;

    @Column(name = "CREATED_ON", nullable = false)
    private LocalDateTime createdOn;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "UPDATED_BY", foreignKey = @ForeignKey(name = "FK_CHATROOM_UPDATED_BY", value = ConstraintMode.CONSTRAINT))
    private User updatedBy;

    @Column(name = "UPDATED_ON")
    private LocalDateTime updatedOn;

    public ChatRoom(String roomName, String roomDescription, boolean group, User createdBy) {
        this.roomName = roomName;
        this.roomDescription = roomDescription;
        this.roomLogo = "default";
        this.group = group;
        this.enabled = true;
        this.deleted = false;
        this.createdBy = createdBy;
        this.createdOn = LocalDateTime.now();
        this.chatRoomAdmins.add(new ChatRoomAdmin(this, createdBy));
    }
}
