package com.bitanxen.app.service;

import com.bitanxen.app.config.security.SessionUser;
import com.bitanxen.app.dto.auth.RegistrationRequestDTO;
import com.bitanxen.app.dto.user.UserDTO;
import com.bitanxen.app.exception.ApplicationException;
import com.bitanxen.app.exception.ApplicationLoginException;
import com.bitanxen.app.exception.ApplicationRegistrationException;
import com.bitanxen.app.repository.user.UserRepository;
import com.bitanxen.app.util.JwtTokenUtil;
import com.bitanxen.app.dto.auth.LoginRequestDTO;
import com.bitanxen.app.dto.auth.TokenDTO;
import com.bitanxen.app.dto.user.SearchUserDTO;
import com.bitanxen.app.model.chat.ChatRoom;
import com.bitanxen.app.model.user.User;
import com.bitanxen.app.repository.chat.ChatRoomRepository;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
@Log4j2
public class AuthenticationServiceImpl implements AuthenticationService {

    private final JwtTokenUtil jwtTokenUtil;
    private final PasswordEncoder passwordEncoder;

    private final ChatRoomRepository chatRoomRepository;
    private final UserRepository userRepository;

    public AuthenticationServiceImpl(UserRepository userRepository, JwtTokenUtil jwtTokenUtil, PasswordEncoder passwordEncoder, ChatRoomRepository chatRoomRepository) {
        this.userRepository = userRepository;
        this.jwtTokenUtil = jwtTokenUtil;
        this.passwordEncoder = passwordEncoder;
        this.chatRoomRepository = chatRoomRepository;
    }

    @Override
    public TokenDTO authenticate(LoginRequestDTO loginRequest) {
        User user = userRepository.findByEmailId(loginRequest.getUsername());
        if(user == null) {
            throw new ApplicationLoginException("Login Failed");
        }

        boolean matches = passwordEncoder.matches(loginRequest.getPassword(), user.getUserPassword());
        if(!matches) {
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

        String encPassword = passwordEncoder.encode(registrationRequest.getPassword());

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

    @Override
    public List<SearchUserDTO> getSearchUser(String searchTerm, String userId) {
        User user = getUser(userId);
        List<User> users = userRepository.searchUser(searchTerm);
        return users.stream()
                .filter(u -> !u.getUserId().equals(userId))
                .map(u -> {
                    List<ChatRoom> existingRoom = chatRoomRepository.findAll()
                            .stream()
                            .filter(chatRoom -> chatRoom.getUsers().size() == 2)
                            .filter(chatRoom -> chatRoom.getUsers().stream().anyMatch(cu -> cu.getUser().getUserId().equals(user.getUserId())))
                            .filter(chatRoom -> chatRoom.getUsers().stream().anyMatch(cu -> cu.getUser().getUserId().equals(u.getUserId())))
                            .collect(Collectors.toList());

                    return SearchUserDTO.builder()
                            .userId(u.getUserId())
                            .emailId(u.getEmailId())
                            .fullName(u.getFullName())
                            .chatRoom(!existingRoom.isEmpty() ? existingRoom.get(0).getChatRoomId() : null)
                            .build();
                })
                .collect(Collectors.toList());
    }
}
