package com.majortomdev.sumreview.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.majortomdev.sumreview.model.Review;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {

//POST    /reviews
//GET     /reviews
//GET     /reviews/{id}
//PUT     /reviews/{id}
//DELETE  /reviews/{id}

}