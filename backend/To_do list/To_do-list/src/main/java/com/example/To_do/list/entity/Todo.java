package com.example.To_do.list.entity;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

// Represents a single todo item stored in the database
@Entity
public class Todo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private Boolean completed = false;

    private LocalDate dueDate;

    private String priority;

    private LocalDateTime createdAt;

    private Boolean deleted = false;

    // Default no-arg constructor required by JPA
    public Todo() {}

    // Creates a todo with a title and completion status
    public Todo(String title, Boolean completed) {
        this.title = title;
        this.completed = completed;
    }

    // Automatically sets the creation timestamp before saving
    @PrePersist
    public void setCreatedAt() {
        this.createdAt = LocalDateTime.now();
    }

    // Returns the todo's unique identifier
    public Long getId() {
        return id;
    }

    // Returns the todo's title text
    public String getTitle() {
        return title;
    }

    // Updates the todo's title text
    public void setTitle(String title) {
        this.title = title;
    }

    // Returns whether the todo is marked as completed
    public Boolean getCompleted() {
        return completed;
    }

    // Sets the todo's completion status
    public void setCompleted(Boolean completed) {
        this.completed = completed;
    }

    // Returns the todo's due date
    public LocalDate getDueDate() {
        return dueDate;
    }

    // Sets the todo's due date
    public void setDueDate(LocalDate dueDate) {
        this.dueDate = dueDate;
    }

    // Returns the todo's priority level
    public String getPriority() {
        return priority;
    }

    // Sets the todo's priority level
    public void setPriority(String priority) {
        this.priority = priority;
    }

    // Returns the timestamp when the todo was created
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    // Returns whether the todo is soft-deleted
    public Boolean getDeleted() {
        return deleted;
    }

    // Sets the todo's soft-delete flag
    public void setDeleted(Boolean deleted) {
        this.deleted = deleted;
    }
}