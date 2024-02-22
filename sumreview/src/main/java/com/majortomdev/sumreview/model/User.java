package com.majortomdev.sumreview.model;
/*  created by joek 21/02/24  */

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;



@Entity
@Table(name = "user")
public class User {
	
	@Id
	@GeneratedValue
  private int id;
  private String userName;
  private String imageUrl;

  public int getId() {
      return id;
  }

  public void setId(int id) {
      this.id = id;
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
}