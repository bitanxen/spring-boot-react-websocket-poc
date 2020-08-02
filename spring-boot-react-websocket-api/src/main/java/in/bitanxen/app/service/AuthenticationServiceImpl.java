package in.bitanxen.app.service;

import in.bitanxen.app.config.security.SessionUser;
import in.bitanxen.app.dto.auth.LoginRequestDTO;
import in.bitanxen.app.dto.auth.RegistrationRequestDTO;
import in.bitanxen.app.dto.auth.TokenDTO;
import in.bitanxen.app.dto.user.UserDTO;
import in.bitanxen.app.exception.ApplicationException;
import in.bitanxen.app.exception.ApplicationLoginException;
import in.bitanxen.app.exception.ApplicationRegistrationException;
import in.bitanxen.app.model.user.User;
import in.bitanxen.app.repository.user.UserRepository;
import in.bitanxen.app.util.JwtTokenUtil;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
@Log4j2
public class AuthenticationServiceImpl implements AuthenticationService {

    private final UserRepository userRepository;
    private final JwtTokenUtil jwtTokenUtil;

    public AuthenticationServiceImpl(UserRepository userRepository, JwtTokenUtil jwtTokenUtil) {
        this.userRepository = userRepository;
        this.jwtTokenUtil = jwtTokenUtil;
    }

    @Override
    public TokenDTO authenticate(LoginRequestDTO loginRequest) {
        User user = userRepository.findByEmailId(loginRequest.getUsername());
        if(user == null) {
            throw new ApplicationLoginException("Login Failed");
        }

        String encPassword = new BCryptPasswordEncoder().encode(loginRequest.getPassword());
        if(!user.getUserPassword().equals(encPassword)) {
            throw new ApplicationLoginException("Login Failed");
        }
        return TokenDTO.builder()
                .token(jwtTokenUtil.generateToken(user.getUserId()))
                .build();
    }

    @Override
    public UserDTO register(RegistrationRequestDTO registrationRequest) {
        User user = userRepository.findByEmailId(registrationRequest.getEmailId());
        if(user != null) {
            throw new ApplicationRegistrationException("User already exists");
        }

        String encPassword = new BCryptPasswordEncoder().encode(registrationRequest.getPassword());

        user = new User(registrationRequest.getEmailId(), encPassword, registrationRequest.getFullName());
        user = userRepository.save(user);
        return UserDTO.builder()
                .userId(user.getUserId())
                .emailId(user.getEmailId())
                .fullName(user.getFullName())
                .build();
    }

    @Override
    public UserDTO getUserDetails(String userId) {
        Optional<User> userOptional = userRepository.findById(userId);
        if(!userOptional.isPresent()) {
            throw new ApplicationException("User not found");
        }
        User user = userOptional.get();
        return UserDTO.builder()
                .userId(user.getUserId())
                .emailId(user.getEmailId())
                .fullName(user.getFullName())
                .build();
    }

    @Override
    public User getUser(String userId) {
        Optional<User> userOptional = userRepository.findById(userId);
        if(!userOptional.isPresent()) {
            throw new ApplicationException("User not found");
        }
        return userOptional.get();
    }

    @Override
    public Optional<SessionUser> isAuthenticated(String token) {
        String username = jwtTokenUtil.getUsernameFromToken(token);
        Boolean aBoolean = jwtTokenUtil.validateToken(token, username);
        User user = getUser(username);
        return !aBoolean ? Optional.empty() :
                Optional.of(new SessionUser(user.getEmailId(), user.getUserPassword(), user.getUserId(), token));
    }

    @Override
    public SessionUser validateToken(String token) {
        Optional<SessionUser> sessionUserOptional = isAuthenticated(token);
        return sessionUserOptional.orElse(null);
    }
}
