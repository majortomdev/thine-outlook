package com.majortomdev.sumreview.controller;
/*  created by joek 22/02/24  */

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.majortomdev.sumreview.model.User;
import com.majortomdev.sumreview.repository.UserRepository;

@RestController
@RequestMapping("/users")
public class UserController {
	
	@Autowired
	private UserRepository userRepository;
	
	@GetMapping("/")
	public List<User> getAllUsers(){
		List<User> users = userRepository.findAll();
		return users;
	}
	
	@GetMapping("/{id}")
	public User getUserById(@PathVariable int id) {
		User user = userRepository.findById(id).get();
		return user;
	}
	
	@PostMapping("/add")
	@ResponseStatus(code=HttpStatus.CREATED)
	public void createUser(@RequestBody User user) {
		userRepository.save(user);
	}
	
	@PutMapping("/update/{id}")
	public User updateUser(@PathVariable int id) {
		User user = userRepository.findById(id).get();
		user.setUserName(user.getUserName()+"(UPDATED)");
		userRepository.save(user);
		return user;
	}
	
	
}