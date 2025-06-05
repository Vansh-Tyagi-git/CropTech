import { initTodos, addTodo, removeTodo, toggleTodo } from './todos.js';
import { renderTodos } from './dom.js';

document.addEventListener('DOMContentLoaded', () => {
    initTodos();
    renderTodos();

    document.getElementById('addBtn').addEventListener('click', () => {
        const input = document.getElementById('todoInput');
        if (input.value.trim()) {
            addTodo(input.value.trim());
            renderTodos();
            input.value = '';
        }
    });

    document.getElementById('todoList').addEventListener('click', (e) => {
        if (e.target.classList.contains('delete')) {
            removeTodo(e.target.dataset.id);
            renderTodos();
        } else if (e.target.classList.contains('toggle')) {
            toggleTodo(e.target.dataset.id);
            renderTodos();
        }
    });
});

