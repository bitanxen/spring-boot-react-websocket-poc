package com.bitanxen.app.controller;

import com.bitanxen.app.dto.auth.RegistrationRequestDTO;
import com.bitanxen.app.dto.user.UserDTO;
import com.bitanxen.app.dto.auth.LoginRequestDTO;
import com.bitanxen.app.dto.auth.TokenDTO;
import com.bitanxen.app.service.AuthenticationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/common")
@CrossOrigin(allowedHeaders="*", allowCredentials="true", origins="*")
public class AuthController {

    private final AuthenticationService authenticationService;

    public AuthController(AuthenticationService authenticationService) {
        this.authenticationService = authenticationService;
    }

    @PostMapping("/login")
    public ResponseEntity<TokenDTO> login(@RequestBody LoginRequestDTO loginRequest) {
        return ResponseEntity.ok(authenticationService.authenticate(loginRequest));
    }

    @PostMapping("/register")
    public ResponseEntity<UserDTO> register(@RequestBody RegistrationRequestDTO registrationRequest) {
        return ResponseEntity.ok(authenticationService.register(registrationRequest));
    }
}
