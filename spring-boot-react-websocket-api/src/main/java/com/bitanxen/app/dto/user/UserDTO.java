package com.bitanxen.app.dto.user;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class UserDTO {
    private String userId;
    private String emailId;
    private String fullName;
}
