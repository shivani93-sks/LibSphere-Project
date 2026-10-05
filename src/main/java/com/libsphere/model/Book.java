package com.libsphere.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "books")
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String author;
    private boolean borrowed;
    private String keyConcepts;

    public Book() {
    }

    public Book(Long id, String title, String author, boolean borrowed, String keyConcepts) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.borrowed = borrowed;
        this.keyConcepts = keyConcepts;
    }

    public Book(String title, String author, boolean borrowed, String keyConcepts) {
        this.title = title;
        this.author = author;
        this.borrowed = borrowed;
        this.keyConcepts = keyConcepts;
    }

    public Book(String title, String author, boolean borrowed) {
        this.title = title;
        this.author = author;
        this.borrowed = borrowed;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public boolean isBorrowed() {
        return borrowed;
    }

    public void setBorrowed(boolean borrowed) {
        this.borrowed = borrowed;
    }

    public String getKeyConcepts() {
        return keyConcepts;
    }

    public void setKeyConcepts(String keyConcepts) {
        this.keyConcepts = keyConcepts;
    }
}
