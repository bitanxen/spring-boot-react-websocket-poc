package in.bitanxen.app.model.chat;

import in.bitanxen.app.model.user.User;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity(name = "TB_USERCHATROOM")
@Getter
@Setter
@NoArgsConstructor
@Table(uniqueConstraints = @UniqueConstraint(name = "UK_USERCHATROOM_USER_CHAT_ROOM", columnNames={"USER", "CHAT_ROOM"}))
public class UserChatRoom {

    @Id
    @GeneratedValue
    @Column(name = "USER_CHAT_ROOM_ID", nullable = false, unique = true)
    private String userChatRoomId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "USER", nullable = false, foreignKey = @ForeignKey(name = "FK_USERCHATROOMP_USER", value = ConstraintMode.CONSTRAINT))
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "CHAT_ROOM", nullable = false, foreignKey = @ForeignKey(name = "FK_USERCHATROOM_CHATROOM", value = ConstraintMode.CONSTRAINT))
    private ChatRoom chatRoom;

    @Column(name = "BLOCKED")
    private boolean blocked;

    public UserChatRoom(User user, ChatRoom chatRoom) {
        this.user = user;
        this.chatRoom = chatRoom;
        this.blocked = false;
    }
}
