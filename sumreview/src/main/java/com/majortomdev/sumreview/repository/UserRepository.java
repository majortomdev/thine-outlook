package com.majortomdev.sumreview.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

import com.majortomdev.sumreview.model.User;

/*  created by joek 22/02/24  */

@Repository
public interface UserRepository extends JpaRepository<User, Long> {


}
