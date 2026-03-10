package com.example.To_do.list.repository;

import com.example.To_do.list.entity.Todo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

// Provides database access methods for todo items
public interface TodoRepository extends JpaRepository<Todo, Long> {

    // Finds non-deleted todos whose title contains the given keyword
    List<Todo> findByTitleContainingAndDeletedFalse(String keyword);

    // Finds non-deleted todos matching a specific due date
    List<Todo> findByDueDateAndDeletedFalse(LocalDate dueDate);

    // Finds all todos that are not soft-deleted
    List<Todo> findByDeletedFalse();
}