package com.majortomdev.sumreview.controller;
/*  created by joek 22/02/24  */

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.majortomdev.sumreview.repository.ReviewRepository;

@RestController
@RequestMapping("/reviews")
public class ReviewController {
  private ReviewRepository reviewRepository;



}