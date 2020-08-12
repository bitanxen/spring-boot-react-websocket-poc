package com.bitanxen.app.repository.user;

import com.bitanxen.app.model.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface UserRepository extends JpaRepository<User, String> {
    User findByEmailId(String emailId);
    @Query("SELECT u from TB_USER u WHERE u.emailId = :searchTerm OR u.fullName LIKE %:searchTerm%")
    List<User> searchUser(String searchTerm);
}
