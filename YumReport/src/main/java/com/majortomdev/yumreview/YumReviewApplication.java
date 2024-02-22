package com.majortomdev.yumreview;
/*  created by joek 21/02/24  */

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class YumReviewApplication {

	@ComponentScan("com.majortomdev.yumreview.controllers.ReviewController")
	public static void main(String[] args) {
		SpringApplication.run(YumReviewApplication.class, args);
	}

}
