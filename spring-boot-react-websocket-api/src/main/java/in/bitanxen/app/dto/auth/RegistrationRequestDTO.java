package in.bitanxen.app.dto.auth;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RegistrationRequestDTO {
    private String emailId;
    private String password;
    private String fullName;
}
