package com.majortomdev.yumreview.controllers;
/*  created by joek 22/02/24  */

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.majortomdev.yumreview.repository.ReviewRepository;

@RestController
@RequestMapping("/reviews")
public class ReviewController {
    private final ReviewRepository reviewRepository = new ReviewRepository();



}
