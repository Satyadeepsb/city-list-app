package com.company.services;

import java.util.HashSet;
import java.util.Set;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.company.entities.Role;
import com.company.entities.User;
import com.company.enums.ERole;
import com.company.repositories.RoleRepository;
import com.company.repositories.UserRepository;

@Service
public class DumpDataService {
	
	private static final Logger logger = LoggerFactory.getLogger(DumpDataService.class);

	@Autowired
	UserRepository userRepository;

	@Autowired
	RoleRepository roleRepository;

	@Autowired
	PasswordEncoder encoder;

	public void dumpInitialUserData() {
		if(!userRepository.existsById(1L)) {
			final String password = "123456789";
			Set<Role> roles = new HashSet<>();
			User user = new User("user", "user@company.com",  encoder.encode(password));
			Role role = new Role(ERole.ROLE_USER);
			roles.add(role);
			user.setRoles(roles);
			userRepository.save(user);

			User admin = new User("admin", "admin@company.com",  encoder.encode(password));
			Set<Role> adminRoles = new HashSet<>();
			Role adminRole = new Role(ERole.ROLE_ADMIN);
			adminRoles.add(adminRole);
			Role editRole = new Role(ERole.ROLE_ALLOW_EDIT);
			adminRoles.add(editRole);
			admin.setRoles(adminRoles);
			userRepository.save(admin);
		} else {
			logger.info("Initial User and Role Data Already Dumped");
		}
	}
}
