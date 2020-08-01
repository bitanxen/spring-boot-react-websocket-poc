package in.bitanxen.app.model.chat;

import in.bitanxen.app.model.user.User;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity(name = "TB_CHATREPORTER")
@Getter
@Setter
@NoArgsConstructor
@Table(uniqueConstraints = @UniqueConstraint(name = "UK_CHATREPORTER_CHAT_REPORTER", columnNames={"CHAT", "REPORTER"}))
public class ChatReporter {

    @Id
    @GeneratedValue
    @Column(name = "CHAT_REPORTER_ID", nullable = false, unique = true)
    private String chatReporterId;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "CHAT", nullable = false, foreignKey = @ForeignKey(name = "FK_CHATREPORTER_CHAT", value = ConstraintMode.CONSTRAINT))
    private Chat chat;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "REPORTER", nullable = false, foreignKey = @ForeignKey(name = "FK_CHATREPORTER_REPORTER", value = ConstraintMode.CONSTRAINT))
    private User reporter;

    @Column(name = "REPORTED_ON", nullable = false)
    private LocalDateTime reportedOn;

    public ChatReporter(Chat chat, User user) {
        this.chat = chat;
        this.reporter = user;
        this.reportedOn = LocalDateTime.now();
    }
}
