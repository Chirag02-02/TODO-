package com.example.To_do.list.controller;

import com.example.To_do.list.entity.Todo;
import com.example.To_do.list.repository.TodoRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

// Handles all CRUD and query operations for todo items
@RestController
@RequestMapping("/todos")
@CrossOrigin(origins = "*")
public class TodoController {

    private final TodoRepository todoRepository;

    // Injects the todo repository dependency
    public TodoController(TodoRepository todoRepository) {
        this.todoRepository = todoRepository;
    }

    // Returns all non-deleted todos
    @GetMapping
    public List<Todo> getAllTodos() {
        return todoRepository.findByDeletedFalse();
    }

    // Creates a new todo and saves it to the database
    @PostMapping
    public Todo createTodo(@RequestBody Todo todo) {
        return todoRepository.save(todo);
    }

    // Finds and returns a single todo by its ID
    @GetMapping("/{id}")
    public Todo getTodoById(@PathVariable Long id) {
        return todoRepository.findById(id).orElse(null);
    }

    // Searches non-deleted todos whose title contains the given keyword
    @GetMapping("/search")
    public List<Todo> search(@RequestParam String keyword) {
        return todoRepository.findByTitleContainingAndDeletedFalse(keyword);
    }

    // Returns all todos sorted by due date in descending order
    @GetMapping("/sorted")
    public List<Todo> getSortedTodos() {
        return todoRepository.findAll(Sort.by(Sort.Direction.DESC, "dueDate"));
    }

    // Returns a paginated list of todos
    @GetMapping("/page")
    public Page<Todo> getPage(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size
    ) {
        Pageable pageable = PageRequest.of(page, size);
        return todoRepository.findAll(pageable);
    }

    // Returns all non-deleted todos matching a specific due date
    @GetMapping("/by-date")
    public List<Todo> getTodosByDate(@RequestParam String date) {
        LocalDate dueDate = LocalDate.parse(date);
        return todoRepository.findByDueDateAndDeletedFalse(dueDate);
    }

    // Updates an existing todo's title, completion status, due date, and priority
    @PutMapping("/{id}")
    public Todo updateTodo(@PathVariable Long id, @RequestBody Todo updatedTodo) {
        return todoRepository.findById(id).map(todo -> {
            todo.setTitle(updatedTodo.getTitle());
            todo.setCompleted(updatedTodo.getCompleted());
            todo.setDueDate(updatedTodo.getDueDate());
            todo.setPriority(updatedTodo.getPriority());
            return todoRepository.save(todo);
        }).orElse(null);
    }

    // Permanently deletes a todo by its ID
    @DeleteMapping("/{id}")
    public void deleteTodo(@PathVariable Long id) {
        todoRepository.deleteById(id);
    }
}