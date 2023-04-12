function createTodoUi(i) {
    const oneTodo = document.createElement('div');
    oneTodo.classList.add('one-todo');
    if(todoList[i].done === 'true'){
    oneTodo.classList.add('todo-done');
    }
    const todoCheckbox = document.createElement('input');
    todoCheckbox.type = 'checkbox';
    if(todoList[i].done === 'true'){
    todoCheckbox.checked = true;
    }
    const todoTitle = document.createElement('span');
    todoTitle.textContent = todoList[i].title;
    const todoDate = document.createElement('input');
    todoDate.type = 'date';
    todoDate.value = todoList[i].dueDate;

    let removeIcon = document.createElement('i');
    removeIcon.classList.add('fa-solid');
    removeIcon.classList.add('fa-trash');
    oneTodo.appendChild(todoCheckbox);
    oneTodo.appendChild(todoTitle);
    oneTodo.appendChild(todoDate);
    oneTodo.appendChild(removeIcon);
    todoContainer.appendChild(oneTodo);
  }

  export default createTodoUi;