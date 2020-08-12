package com.bitanxen.app.controller;

import com.bitanxen.app.config.security.SessionUser;
import com.bitanxen.app.dto.user.SearchUserDTO;
import com.bitanxen.app.dto.user.UserDTO;
import com.bitanxen.app.service.AuthenticationService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/api")
@CrossOrigin(allowedHeaders="*", allowCredentials="true", origins="*")
public class IndexController {

    private final AuthenticationService authenticationService;

    public IndexController(AuthenticationService authenticationService) {
        this.authenticationService = authenticationService;
    }

    @GetMapping(value = "/user")
    public ResponseEntity<UserDTO> getUser(Authentication authentication) {
        SessionUser sessionUser = (SessionUser) authentication.getPrincipal();
        return ResponseEntity.ok(authenticationService.getUserDetails(sessionUser.getUserId()));
    }

    @GetMapping(value = "/search")
    public ResponseEntity<List<SearchUserDTO>> getSearchUser(@RequestParam String searchTerm, Authentication authentication) {
        SessionUser sessionUser = (SessionUser) authentication.getPrincipal();
        return ResponseEntity.ok(authenticationService.getSearchUser(searchTerm, sessionUser.getUserId()));
    }


}
