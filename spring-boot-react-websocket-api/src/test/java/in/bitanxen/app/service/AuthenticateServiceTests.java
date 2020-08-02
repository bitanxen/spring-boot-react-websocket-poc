package in.bitanxen.app.service;

import in.bitanxen.app.dto.auth.RegistrationRequestDTO;
import in.bitanxen.app.dto.user.UserDTO;
import in.bitanxen.app.exception.ApplicationException;
import in.bitanxen.app.exception.ApplicationRegistrationException;
import in.bitanxen.app.model.user.User;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import static org.mockito.ArgumentMatchers.anyString;

@SpringBootTest
@ActiveProfiles(value = "test")
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class AuthenticateServiceTests {

    @Autowired
    private AuthenticationService authenticationService;

    static String userId = null;

    public RegistrationRequestDTO getCreateUserRequest() {
        String emailId = "test@application.com";
        String fullName = "Application Test";
        String password = "Test@123";

        RegistrationRequestDTO registrationRequest = new RegistrationRequestDTO();
        registrationRequest.setEmailId(emailId);
        registrationRequest.setFullName(fullName);
        registrationRequest.setPassword(password);
        return registrationRequest;
    }

    @Test
    @Order(1)
    public void registerUser_creatingUser_userIdNotNull() {
        RegistrationRequestDTO createUserRequest = getCreateUserRequest();
        UserDTO createdUser = authenticationService.register(createUserRequest);
        userId = createdUser.getUserId();
        Assertions.assertNotNull(createdUser.getUserId(), "User not saved");
    }

    @Test
    @Order(2)
    public void registerUser_reCreatingSameUser_throwError() {
        RegistrationRequestDTO createUserRequest = getCreateUserRequest();
        Assertions.assertThrows(ApplicationRegistrationException.class, () -> authenticationService.register(createUserRequest));
    }

    @Test
    @Order(3)
    public void registerUser_newUser_getValidUser() {
        User getUser = authenticationService.getUser(userId);
        Assertions.assertNotNull(getUser, "User not found");
    }

    @Test
    @Order(4)
    public void registerUser_newUser_throwExceptionForInvalidUser() {
        Assertions.assertThrows(ApplicationException.class, () -> authenticationService.getUser(anyString()));
    }

    @Test
    @Order(5)
    public void registerUser_newUser_passwordEncrypted() {
        RegistrationRequestDTO createUserRequest = getCreateUserRequest();
        User user = authenticationService.getUser(userId);
        Assertions.assertNotEquals(user.getUserPassword(), createUserRequest.getPassword());
    }
}
