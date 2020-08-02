package in.bitanxen.app.service;

import in.bitanxen.app.config.security.SessionUser;
import in.bitanxen.app.dto.auth.LoginRequestDTO;
import in.bitanxen.app.dto.auth.RegistrationRequestDTO;
import in.bitanxen.app.dto.auth.TokenDTO;
import in.bitanxen.app.dto.user.UserDTO;
import in.bitanxen.app.model.user.User;

import java.util.Optional;

public interface AuthenticationService {
    TokenDTO authenticate(LoginRequestDTO loginRequest);
    UserDTO register(RegistrationRequestDTO registrationRequest);
    UserDTO getUserDetails(String userId);
    User getUser(String userId);
    Optional<SessionUser> isAuthenticated(String s);
    SessionUser validateToken(String token);
}
