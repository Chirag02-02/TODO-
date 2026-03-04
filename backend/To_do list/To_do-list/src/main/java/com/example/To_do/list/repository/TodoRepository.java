package com.example.To_do.list.repository;

import com.example.To_do.list.entity.Todo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface TodoRepository extends JpaRepository<Todo, Long> {

    List<Todo> findByTitleContainingAndDeletedFalse(String keyword);
    List<Todo> findByDueDateAndDeletedFalse(LocalDate dueDate);
    List<Todo> findByDeletedFalse();



}