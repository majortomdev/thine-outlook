package com.majortomdev.sumreview.model;
/*  created by joek 21/02/24  */

import com.fasterxml.jackson.annotation.JsonProperty;

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
	@JsonProperty
	@Column(name="user_name")
	private String userName;
	@JsonProperty
	@Column(name="image_url")
	private String imageUrl;
	@JsonProperty
	@Column(name="e_mail")
	private String eMail;
	@JsonProperty
	@Column(name="password")
	private String password;
	
	public User() {
		
	}

	public User(int user_id, String userName, String imageUrl, String eMail, String password) {
		super();
		this.user_id = user_id;
		this.userName = userName;
		this.imageUrl = imageUrl;
		this.eMail = eMail;
		this.password = password;
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

	public String geteMail() {
		return eMail;
	}

	public void seteMail(String eMail) {
		this.eMail = eMail;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	@Override
	public String toString() {
		return "User [user_id=" + user_id + ", userName=" + userName
				+ ", imageUrl=" + imageUrl + ", eMail=" + eMail
				+ "]";
	}


	
	
}