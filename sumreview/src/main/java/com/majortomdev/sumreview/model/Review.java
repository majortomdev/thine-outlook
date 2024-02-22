package com.majortomdev.sumreview.model;
/*  created by joek 21/02/24  */

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;




@Entity
@Table(name = "review")
public class Review {
  @Id
  @GeneratedValue
  private int id;
  private int user;
  private String content;

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

  public String getContent() {
      return content;
  }

  public void setContent(String content) {
      this.content = content;
  }
}