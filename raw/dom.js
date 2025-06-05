import { getTodos } from './todos.js';

export function renderTodos() {
    const list = document.getElementById('todoList');
    list.innerHTML = '';

    const todos = getTodos();
    todos.forEach(todo => {
        const li = document.createElement('li');
        li.innerHTML = `
            <input type="checkbox" class="toggle" data-id="${todo.id}" ${todo.completed ? 'checked' : ''}>
            <span style="text-decoration: ${todo.completed ? 'line-through' : 'none'}">${todo.text}</span>
            <button class="delete" data-id="${todo.id}">❌</button>
        `;
        list.appendChild(li);
    });
}
