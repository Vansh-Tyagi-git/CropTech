export function saveData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

export function loadData(key) {
    const json = localStorage.getItem(key);
    return json ? JSON.parse(json) : null;
}

