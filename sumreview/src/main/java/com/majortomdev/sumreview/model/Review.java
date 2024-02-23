package com.majortomdev.sumreview.model;
/*  created by joek 21/02/24  */

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;




@Entity
@Table(name = "review")
public class Review {
  @Id
  @GeneratedValue
  @Column(name="review_id")
  private int id;
  @Column(name="user")
  private int user;
  @Column(name="title")
  private String title;
  @Column(name="content")
  private String content;

  public Review () {
	  
  }
  
  public Review(int id, int user, String title, String content) {
	super();
	this.id = id;
	this.user = user;
	this.title = title;
	this.content = content;
}


  public int getId() {
      return id;
  }

  public void setId(int id) {
      this.id = id;
  }

  public int getUser() {
      return user;
  }

  public void setUser(int user) {
      this.user = user;
  }

  public String getTitle() {
	return title;
}

  public void setTitle(String title) {
	this.title = title;
}

  public String getContent() {
      return content;
  }

  public void setContent(String content) {
      this.content = content;
  }

  @Override
  public String toString() {
		return "Review [id=" + id + ", user=" + user + ", title=" 
				+ title + ", content=" + content + "]";
  }
  
}