import React, { useState } from "react";
import TodoItem from "../TodoItem/TodoItem";
import EmptyState from "../EmptyState/EmptyState";
import "./TodoList.css";

// Number of tasks displayed per page
const PAGE_SIZE = 5;

// Renders a paginated todo list with navigation controls
function TodoList({ todos, onToggle, onEdit, onDelete }) {
  const [currentPage, setCurrentPage] = useState(0);

  // Sorts todos so incomplete tasks appear before completed ones
  const sortedTodos = [...todos].sort((a, b) => a.completed - b.completed);

  // Calculates total pages needed for the current list
  const totalPages = Math.max(1, Math.ceil(sortedTodos.length / PAGE_SIZE));

  // Clamps current page if the list shrinks after a delete or filter change
  const safePage = Math.min(currentPage, totalPages - 1);
  if (safePage !== currentPage) setCurrentPage(safePage);

  // Slices the sorted list to only show the current page's items
  const startIndex = safePage * PAGE_SIZE;
  const pageItems = sortedTodos.slice(startIndex, startIndex + PAGE_SIZE);

  // Navigates to the previous page
  const goToPrev = () => {
    if (safePage > 0) setCurrentPage(safePage - 1);
  };

  // Navigates to the next page
  const goToNext = () => {
    if (safePage < totalPages - 1) setCurrentPage(safePage + 1);
  };

  // Navigates directly to a specific page number
  const goToPage = (pageNum) => {
    setCurrentPage(pageNum);
  };

  // Builds the array of page numbers to show in the pagination bar
  const getPageNumbers = () => {
    const pages = [];
    for (let i = 0; i < totalPages; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <>
      {todos.length > 0 && (
        <div className="list-header">
          Tasks
          <span className="list-count">{sortedTodos.length} total</span>
        </div>
      )}

      <ul className="todo-list">
        {sortedTodos.length === 0 ? (
          <EmptyState />
        ) : (
          pageItems.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={onToggle}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))
        )}
      </ul>

      {/* Pagination controls shown only when there are multiple pages */}
      {totalPages > 1 && (
        <div className="pagination">
          <button
            className="page-btn"
            onClick={goToPrev}
            disabled={safePage === 0}
          >
            ‹ Prev
          </button>

          <div className="page-numbers">
            {getPageNumbers().map((pageNum) => (
              <button
                key={pageNum}
                className={`page-num${pageNum === safePage ? " active" : ""}`}
                onClick={() => goToPage(pageNum)}
              >
                {pageNum + 1}
              </button>
            ))}
          </div>

          <button
            className="page-btn"
            onClick={goToNext}
            disabled={safePage >= totalPages - 1}
          >
            Next ›
          </button>
        </div>
      )}
    </>
  );
}

export default TodoList;
