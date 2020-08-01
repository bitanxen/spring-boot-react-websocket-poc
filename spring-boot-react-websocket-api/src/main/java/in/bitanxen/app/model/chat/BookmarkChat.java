package in.bitanxen.app.model.chat;

import in.bitanxen.app.model.user.User;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity(name = "TB_BOOKMARKCHAT")
@Getter
@Setter
@NoArgsConstructor
@Table(uniqueConstraints = @UniqueConstraint(name = "UK_BOOKMARKCHAT_CHAT_USER", columnNames={"CHAT", "USER"}))
public class BookmarkChat {

    @Id
    @GeneratedValue
    @Column(name = "CHAT_BOOKMARK_ID", nullable = false, unique = true)
    private String bookmarkId;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "CHAT", nullable = false, foreignKey = @ForeignKey(name = "FK_BOOKMARKEDCHAT_CHAT", value = ConstraintMode.CONSTRAINT))
    private Chat chat;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "USER", nullable = false, foreignKey = @ForeignKey(name = "FK_BOOKMARKEDCHAT_USER", value = ConstraintMode.CONSTRAINT))
    private User user;

    @Column(name = "REPORTED_ON", nullable = false)
    private LocalDateTime bookmarkedOn;

    public BookmarkChat(Chat chat, User user) {
        this.chat = chat;
        this.user = user;
        this.bookmarkedOn = LocalDateTime.now();
    }

}
