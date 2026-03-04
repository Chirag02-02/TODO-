package com.example.To_do.list.controller;

import com.example.To_do.list.entity.Todo;
import com.example.To_do.list.entity.User;
import com.example.To_do.list.repository.TodoRepository;
import com.example.To_do.list.repository.UserRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/todos")
@CrossOrigin(origins = "*")
public class TodoController {

    private final TodoRepository todoRepository;
    private final UserRepository userRepository;

    public TodoController(TodoRepository todoRepository, UserRepository userRepository) {
        this.todoRepository = todoRepository;
        this.userRepository = userRepository;
    }


    // READ ALL Todos
    @GetMapping
    public List<Todo> getAllTodos() {
        return todoRepository.findByDeletedFalse();
    }
    // CREATE Todo linked to user
    @PostMapping("")
    public Todo createTodo(@RequestBody Todo todo) {
        return todoRepository.save(todo);
    }
    // READ Todo by ID
    @GetMapping("/{id}")
    public Todo getTodoById(@PathVariable Long id) {
        return todoRepository.findById(id).orElse(null);
    }

    // SEARCH Todos by title
    @GetMapping("/search")
    public List<Todo> search(@RequestParam String keyword) {
        return todoRepository.findByTitleContainingAndDeletedFalse(keyword);
    }

    // SORT Todos by dueDate DESC
    @GetMapping("/sorted")
    public List<Todo> getSortedTodos() {
        return todoRepository.findAll(Sort.by(Sort.Direction.DESC, "dueDate"));
    }

    // PAGINATION
    @GetMapping("/page")
    public Page<Todo> getPage(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size
    ) {
        Pageable pageable = PageRequest.of(page, size);
        return todoRepository.findAll(pageable);
    }
    @GetMapping("/by-date")
    public List<Todo> getTodosByDate(@RequestParam String date) {
        LocalDate dueDate = LocalDate.parse(date);
        return todoRepository.findByDueDateAndDeletedFalse(dueDate);
    }


    // UPDATE Todo
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

    // DELETE Todo
    @DeleteMapping("/{id}")
    public void deleteTodo(@PathVariable Long id) {
        todoRepository.deleteById(id);
    }
}