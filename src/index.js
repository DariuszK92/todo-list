import _, { difference, divide } from 'lodash'
import './style.css'


const newProjectBtn = document.querySelector('#newProject');
const projectContainer = document.querySelector(".project-list");
const newProjectDiv = document.querySelector('.new-project-div');
const addProjectBtn = document.querySelector('.addBtn');
const cancelProjectBtn = document.querySelector('.cancelBtn');


let todoList = [
    {
        title: 'Play Sport',
        description: 'Play football with friends in the part',
        dueDate: '2023-02-03',
        priority: 'green',
        project: 'daro'
    },
    {
        title: 'clean bathroom',
        description: 'Play football with friends in the part',
        dueDate: '2024-02-03',
        priority: 'green',
        project: 'daro'
    }

];
let projectList = [
    {
        name: 'All projects',
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
};

// PROJECT PREPARATION

const projectFactory = (name, removable = true) =>{
    return {name, removable};
};

function showProjectForm() {
    newProjectBtn.style.display = 'none';
    newProjectDiv.style.display = "block";
 
};

newProjectBtn.addEventListener('click',showProjectForm)

function showProjects() {
    while (projectContainer.firstChild) {
        projectContainer.removeChild(projectContainer.lastChild);
      }
    for(let i=0;i<projectList.length;i++){
        let projectDiv = document.createElement('button');
        projectDiv.textContent = `${projectList[i].name}`;
        projectContainer.appendChild(projectDiv)
         if(projectList[i].removable === true){
            let removeIcon = document.createElement('i');
            removeIcon.classList.add('fa-solid');
            removeIcon.classList.add('fa-trash');
            projectDiv.appendChild(removeIcon);
         }
    }
}

showProjects();

function closeProjectInput() {
    newProjectDiv.style.display = "none";
    newProjectBtn.style.display = "block";
    const projectInput = document.querySelector('.project-name');
    projectInput.value='';
}

cancelProjectBtn.addEventListener('click', closeProjectInput)

// ADD new project
function addNewProject() {
    const projectInput = document.querySelector('.project-name')
    let projectName = projectInput.value;
    let newProject = projectFactory(projectName);
    projectList.push(newProject);
    projectInput.value='';
    closeProjectInput();
    showProjects();  
}

addProjectBtn.addEventListener('click', addNewProject)

projectContainer.addEventListener("click", function(e){
    const target = e.target.closest(".fa-trash");  
    if(target){
        const toRemove = target.parentNode.innerText;        
        projectList = projectList.filter(function( obj ) {
            return obj.name !== toRemove;
          });
          showProjects();
    }
  });

  //Add new Todo

  function showAllTodos() {
    const todoContainer = document.querySelector('.todos');

    for(let i=0; i<todoList.length;i++) {
        const oneTodo = document.createElement('div');
        oneTodo.classList.add('one-todo');
        const todoCheckbox = document.createElement('input');
        todoCheckbox.type = 'checkbox';
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
  }

  showAllTodos();