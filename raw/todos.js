

import { saveData, loadData } from './storage.js';

let todos = [];

export function initTodos() {
    todos = loadData('todos') || [];
}

export function addTodo(text) {
    todos.push({
        id: Date.now().toString(),
        text,
        completed: false
    });
    saveData('todos', todos);
}

export function removeTodo(id) {
    todos = todos.filter(todo => todo.id !== id);
    saveData('todos', todos);
}

export function toggleTodo(id) {
    const todo = todos.find(t => t.id === id);
    if (todo) todo.completed = !todo.completed;
    saveData('todos', todos);
}

export function getTodos() {
    return todos;
}
