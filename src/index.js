import _, { bindAll } from 'lodash';
import './style.css'

const newProjectBtn = document.querySelector('#newProject');

let todoList = [];
let projectList = [
    {
        name: 'All',
        removable: false
    }
];

// TODO PREPARATION

function todosFactory(title, description, dueDate,priority,project) {
    return {
        title,
        description,
        dueDate,
        priority,
        project
    }
}

// PROJECT PREPARATION

function projectFactory(name, removable = true){
    return name;
}

newProjectBtn.addEventListener('click', addProject)






let todo1 = todosFactory('Bumerang', 'Kup bumerang', '24.12.1992', 'top', 'og');

console.log(todo1)