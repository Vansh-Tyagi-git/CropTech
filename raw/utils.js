export function debounce(func, delay) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), delay);
    };
}

export function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}
