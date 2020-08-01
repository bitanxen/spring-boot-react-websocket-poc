package in.bitanxen.app.repository.user;

import in.bitanxen.app.model.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, String> {
    User findByEmailId(String emailId);
}
