package in.bitanxen.app.controller;

import in.bitanxen.app.config.security.SessionUser;
import in.bitanxen.app.dto.user.UserDTO;
import in.bitanxen.app.service.AuthenticationService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/api")
public class IndexController {

    private final AuthenticationService authenticationService;

    public IndexController(AuthenticationService authenticationService) {
        this.authenticationService = authenticationService;
    }

    @GetMapping(value = "/user")
    public ResponseEntity<UserDTO> getUser(Authentication authentication) {
        SessionUser sessionUser = (SessionUser) authentication.getPrincipal();
        return ResponseEntity.ok(authenticationService.getUserDetails(sessionUser.getToken()));
    }
}
