package in.bitanxen.app.controller;

import in.bitanxen.app.dto.auth.LoginRequestDTO;
import in.bitanxen.app.dto.auth.RegistrationRequestDTO;
import in.bitanxen.app.dto.auth.TokenDTO;
import in.bitanxen.app.dto.user.UserDTO;
import in.bitanxen.app.service.AuthenticationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/public")
public class AuthController {

    private final AuthenticationService authenticationService;

    public AuthController(AuthenticationService authenticationService) {
        this.authenticationService = authenticationService;
    }

    @RequestMapping("/login")
    public ResponseEntity<TokenDTO> login(@RequestBody LoginRequestDTO loginRequest) {
        return ResponseEntity.ok(authenticationService.authenticate(loginRequest));
    }

    @RequestMapping("/register")
    public ResponseEntity<UserDTO> register(@RequestBody RegistrationRequestDTO registrationRequest) {
        return ResponseEntity.ok(authenticationService.register(registrationRequest));
    }
}
