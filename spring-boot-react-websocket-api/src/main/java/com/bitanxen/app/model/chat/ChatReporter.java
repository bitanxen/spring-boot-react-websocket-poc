package com.bitanxen.app.model.chat;

import com.bitanxen.app.model.user.User;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity(name = "TB_CHATREPORTER")
@Getter
@Setter
@NoArgsConstructor
@Table(uniqueConstraints = @UniqueConstraint(name = "UK_CHATREPORTER_CHAT_REPORTER", columnNames={"CHAT", "REPORTER"}))
public class ChatReporter {

    @Id
    @GenericGenerator(name = "Application-Generic-Generator",
            strategy = "com.bitanxen.app.config.ApplicationGenericGenerator"
    )
    @GeneratedValue(generator = "Application-Generic-Generator")
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
