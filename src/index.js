import _, { divide } from 'lodash'
import './style.css'


const newProjectBtn = document.querySelector('#newProject');
const projectContainer = document.querySelector(".projects");
const newProjectDiv = document.querySelector('.new-project-div');
const addProjectBtn = document.querySelector('.addBtn');
const cancelProjectBtn = document.querySelector('.cancelBtn');


let todoList = [

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
    for(let i=0;i<projectList.length;i++){
        let projectDiv = document.createElement('button');
        projectDiv.textContent = `${projectList[i].name}`;
        projectContainer.appendChild(projectDiv)
    }
}

showProjects();

function closeProjectInput() {
    newProjectDiv.style.display = "none";
    newProjectBtn.style.display = "block";
}

cancelProjectBtn.addEventListener('click', closeProjectInput)

// ADD new project
function addNewProject() {
    const projectInput = document.querySelector('.project-name')
    let projectName = projectInput.value;
    console.log(projectName)
        let newProject = projectFactory(projectName);
        console.log(newProject)
        projectList.push(newProject);
        projectInput.value='';
        closeProjectInput();
        showProjects();
    
}

addProjectBtn.addEventListener('click', addNewProject)