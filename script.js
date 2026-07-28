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




