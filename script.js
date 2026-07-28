let todos = JSON.parse(localStorage.getItem('pro_todo_list')) || [];
let currentFilter = 'all';


const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');
const emptyState = document.getElementById('empty-state');
const filterBtns = document.querySelectorAll('.tab-btn');
const itemsLeft = document.getElementById('items-left');
const clearCompletedBtn = document.getElementById('clear-completed');
const completedCount = document.getElementById('completed-count');
const totalCount = document.getElementById('total-count');


document.addEventListener('DOMContentLoaded', () => {
    renderTodos();
    setupEventListeners();
});
function setupEventListeners() {
    todoForm.addEventListener('submit', handleAddTodo);
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            filterBtns.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            currentFilter = e.target.dataset.filter;
            renderTodos();
        });
    });

    clearCompletedBtn.addEventListener('click', handleClearCompleted);
}


function handleAddTodo(e) {
    e.preventDefault();
    const text = todoInput.value.trim();
    if (!text) return;

    const newTodo = {
        id: Date.now(),
        text: text,
        completed: false
    };

    todos.unshift(newTodo);
    saveAndRender();
    todoInput.value = '';
}


function toggleTodo(id) {
    todos = todos.map(todo => 
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    saveAndRender();
}


function deleteTodo(id) {
    todos = todos.filter(todo => todo.id !== id);
    saveAndRender();
}


function handleClearCompleted() {
    todos = todos.filter(todo => !todo.completed);
    saveAndRender();
}

function getFilteredTodos() {
    if (currentFilter === 'pending') {
        return todos.filter(todo => !todo.completed);
    }
    if (currentFilter === 'completed') {
        return todos.filter(todo => todo.completed);
    }
    return todos;
}


function saveAndRender() {
    localStorage.setItem('pro_todo_list', JSON.stringify(todos));
    renderTodos();
}


function renderTodos() {
    const filteredTodos = getFilteredTodos();
    todoList.innerHTML = '';

    if (filteredTodos.length === 0) {
        emptyState.style.display = 'block';
    } else {
        emptyState.style.display = 'none';

        filteredTodos.forEach(todo => {
            const li = document.createElement('li');
            li.className = `task-item ${todo.completed ? 'completed' : ''}`;
            
            li.innerHTML = `
                <div class="task-content">
                    <div class="custom-checkbox" onclick="toggleTodo(${todo.id})">
                        <i class="fa-solid fa-check"></i>
                    </div>
                    <span class="task-text">${escapeHTML(todo.text)}</span>
                </div>
                <button class="delete-btn" onclick="deleteTodo(${todo.id})">
                    <i class="fa-solid fa-trash-can"></i>
                </button>
            `;
            
            todoList.appendChild(li);
        });
    }

    updateStats();
}


function updateStats() {
    const activeCount = todos.filter(todo => !todo.completed).length;
    const doneCount = todos.filter(todo => todo.completed).length;

    itemsLeft.innerText = `${activeCount} item${activeCount !== 1 ? 's' : ''} left`;
    completedCount.innerText = doneCount;
    totalCount.innerText = todos.length;
}


function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
        tag => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            "'": '&#39;',
            '"': '&quot;'
        }[tag] || tag)
    );
}




