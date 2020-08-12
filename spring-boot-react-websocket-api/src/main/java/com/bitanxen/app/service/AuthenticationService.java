package com.bitanxen.app.service;

import com.bitanxen.app.config.security.SessionUser;
import com.bitanxen.app.dto.auth.RegistrationRequestDTO;
import com.bitanxen.app.dto.user.UserDTO;
import com.bitanxen.app.dto.auth.LoginRequestDTO;
import com.bitanxen.app.dto.auth.TokenDTO;
import com.bitanxen.app.dto.user.SearchUserDTO;
import com.bitanxen.app.model.user.User;

import java.util.List;
import java.util.Optional;

public interface AuthenticationService {
    TokenDTO authenticate(LoginRequestDTO loginRequest);
    UserDTO register(RegistrationRequestDTO registrationRequest);
    UserDTO getUserDetails(String userId);
    User getUser(String userId);
    Optional<SessionUser> isAuthenticated(String s);
    SessionUser validateToken(String token);
    List<SearchUserDTO> getSearchUser(String searchTerm, String userId);
}
