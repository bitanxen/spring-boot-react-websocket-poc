package com.bitanxen.app.model.chat;

import com.bitanxen.app.model.user.User;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;

@Entity(name = "TB_USERCHATROOM")
@Getter
@Setter
@NoArgsConstructor
@Table(uniqueConstraints = @UniqueConstraint(name = "UK_USERCHATROOM_USER_CHAT_ROOM", columnNames={"USER", "CHAT_ROOM"}))
public class UserChatRoom {

    @Id
    @GenericGenerator(name = "Application-Generic-Generator",
            strategy = "com.bitanxen.app.config.ApplicationGenericGenerator"
    )
    @GeneratedValue(generator = "Application-Generic-Generator")
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

    @Column(name = "ADMIN")
    private boolean admin;

    public UserChatRoom(User user, ChatRoom chatRoom, boolean isAdmin) {
        this.user = user;
        this.chatRoom = chatRoom;
        this.blocked = false;
        this.admin = isAdmin;
    }
}
