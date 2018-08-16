let todoList = document.querySelector('#todoList');
let todoAdd = document.querySelector('#todoAdd');
let todoSearch = document.querySelector('#todoSearch');
let clearListBtn = document.querySelector('.btn-clear-list');
let itemsArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];

localStorage.setItem('items', JSON.stringify(itemsArray));
const data = JSON.parse(localStorage.getItem('items'));

function addTask(text) {

  //div for element todo
  const todo = document.createElement('div');
  todo.classList.add('todo-element'); // className

  //upper bar 
  const todoBar = document.createElement('div');
  todoBar.classList.add('todo-element-bar');

  // date in upper bar    
  const todoDate = document.createElement('div');
  todoDate.classList.add('todo-element-bar');
  const date = new Date();
  const dateText = date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear() + ' | ' + date.getHours() + ':' + date.getMinutes();
  todoDate.innerText = dateText;

  //button to delete element
  const todoDelete = document.createElement('button');
  todoDelete.className = "todo-element-delete button";
  
  const i = document.createElement('i');
  i.className = "fas fa-times-circle";
  
  todoDelete.appendChild(i);

  //insert date and delete button to upper bar
  todoBar.appendChild(todoDate);
  todoBar.appendChild(todoDelete);

  //element with text
  const todoText = document.createElement('div');
  todoText.classList.add('todo-element-text');
  todoText.innerText = text;

  todo.appendChild(todoBar);
  todo.appendChild(todoText);
  todoList.append(todo);
}

// add to localStorage
todoAdd.addEventListener('submit', function(e) {
  e.preventDefault();
  const input = this.querySelector('input');
  if (input.value !== '') {
    itemsArray.push(input.value);
    localStorage.setItem('items', JSON.stringify(itemsArray));
    addTask(input.value);
    input.value = '';
  }
});

data.forEach(item => {
  addTask(item);
});

//remove task from list and from localStorage
todoList.addEventListener('click', function(e) {
  e.preventDefault();
  if (e.target.closest('.todo-element-delete') !== null) {
    e.target.closest('.todo-element').remove();
    localStorage.removeItem();
  }
});


//remove all task and clear localStorage
clearListBtn.addEventListener('click', function(e) {
  e.preventDefault();
  todoList.remove();
  localStorage.clear();
});

//filter search task
todoSearch.addEventListener('input', function() {
  const val = this.value;
  const elems = todoList.querySelectorAll('.todo-element');
  [].forEach.call(elems, function(el) {
    const text = el.querySelector('.todo-element-text').innerText;
    if (text.indexOf(val) !== -1) {
      el.style.setProperty('display', 'block');
    } else {
      el.style.setProperty('display', 'none'); // visibility
    }
  });
});
