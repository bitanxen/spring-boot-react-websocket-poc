package in.bitanxen.app.datajpa;

import in.bitanxen.app.model.user.User;
import in.bitanxen.app.repository.user.UserRepository;
import in.bitanxen.app.service.AuthenticationService;
import in.bitanxen.app.util.JwtTokenUtil;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.ActiveProfiles;

import java.util.Optional;

import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;

@SpringBootTest
@ActiveProfiles("test")
public class UserRepositoryIntegrationTests {

    @MockBean
    private UserRepository userRepository;
    @MockBean
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private AuthenticationService authenticationService;

    @BeforeEach
    void setup(){
        MockitoAnnotations.initMocks(this);
    }

    @Test
    public void userTest_getUser() {
        User user = new User();
        user.setUserId("user123");
        user.setEmailId("user@test.com");
        user.setUserPassword("Test@123");
        user.setFullName("Test");

        when(userRepository.findById(anyString())).thenReturn(Optional.of(user));

        User user123 = authenticationService.getUser("user123");
        Assertions.assertNotNull(user123, "User not found");
        Assertions.assertEquals(user123.getBookmarkChats().size(), 0);
        Assertions.assertEquals(user123.getChatRooms().size(), 0);
    }
}
