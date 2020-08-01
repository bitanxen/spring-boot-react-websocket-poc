package in.bitanxen.app.model.chat;

import in.bitanxen.app.model.user.User;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity(name = "TB_CHATROOMADMIN")
@Getter
@Setter
@NoArgsConstructor
@Table(uniqueConstraints = @UniqueConstraint(name = "UK_CHATROOMADMIN_CHAT_ROOM_ADMIN", columnNames={"CHAT_ROOM", "ADMIN"}))
public class ChatRoomAdmin {

    @Id
    @GeneratedValue
    @Column(name = "CHAT_ROOM_ADMIN_ID", nullable = false, unique = true)
    private String adminId;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "CHAT_ROOM", nullable = false, foreignKey = @ForeignKey(name = "FK_CHATROOMADMIN_CHAT_ROOM", value = ConstraintMode.CONSTRAINT))
    private ChatRoom chatRoom;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "ADMIN", nullable = false, foreignKey = @ForeignKey(name = "FK_CHATROOMADMIN_ADMIN", value = ConstraintMode.CONSTRAINT))
    private User admin;

    public ChatRoomAdmin(ChatRoom chatRoom, User admin) {
        this.chatRoom = chatRoom;
        this.admin = admin;
    }
}
