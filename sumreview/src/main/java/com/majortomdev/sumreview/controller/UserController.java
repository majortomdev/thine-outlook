package com.majortomdev.sumreview.controller;
/*  created by joek 22/02/24  */

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.majortomdev.sumreview.repository.UserRepository;


@RestController
@RequestMapping("/users")
public class UserController {
	
	@Autowired
	private UserRepository userRepository;
	
	//@GetMapping("/user")
}