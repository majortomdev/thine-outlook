package com.majortomdev.sumreview.model;
/*  created by joek 21/02/24  */

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;



@Entity
@Table(name = "user")
public class User {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int user_id;
	@Column(name="user_name")
	private String userName;
	@Column(name="image_url")
	private String imageUrl;
	
	public User() {
		
	}
	
	public User(int id, String userName, String imageUrl) {
		super();
		this.user_id = id;
		this.userName = userName;
		this.imageUrl = imageUrl;
	}

	public int getId() {
	      return user_id;
	  }
	
	public void setId(int id) {
	      this.user_id = id;
	  }
	
	public String getUserName() {
	      return userName;
	  }
	
	public void setUserName(String userName) {
	      this.userName = userName;
	  }
	
	public String getImageUrl() {
	      return imageUrl;
	  }
	
	public void setImageUrl(String imageUrl) {
	      this.imageUrl = imageUrl;
	  }

	@Override
	public String toString() {
		return "User [id=" + user_id + ", userName=" + userName + 
				", imageUrl=" + imageUrl + "]";
	}
	
	
}