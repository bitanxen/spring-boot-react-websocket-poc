package in.bitanxen.app.model.user;

import in.bitanxen.app.model.chat.BookmarkChat;
import in.bitanxen.app.model.chat.UserChatRoom;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity(name = "TB_USER")
@Getter
@Setter
@NoArgsConstructor
public class User {

    @Id
    @GeneratedValue
    @Column(name = "USER_ID", nullable = false, unique = true)
    private String userId;

    @Column(name = "USER_PASSWORD", nullable = false)
    private String userPassword;

    @Column(name = "FULL_NAME")
    private String fullName;

    @Column(name = "EMAIL_ID")
    private String emailId;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "user")
    private Set<UserChatRoom> chatRooms = new HashSet<>();

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "user")
    private Set<BookmarkChat> bookmarkChats = new HashSet<>();
}
