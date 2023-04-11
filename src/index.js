import _, { difference, divide } from 'lodash'
import './style.css'


const newProjectBtn = document.querySelector('#newProject');
const projectContainer = document.querySelector(".project-list");
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

function todosFactory(title, description, dueDate,priority,project, done) {
    return {
        title,
        description,
        dueDate,
        priority,
        project,
        done
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
    const found = projectList.some(el => el.name === projectName);
    if(!found){
    let newProject = projectFactory(projectName);
    projectList.push(newProject);
    projectInput.value='';
    closeProjectInput();
    showProjects();  
    } else {
        alert("Project already exists!");
        closeProjectInput();
    }
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
    while (todoContainer.firstChild) {
        todoContainer.removeChild(todoContainer.lastChild);
      }
    for(let i=0; i<todoList.length;i++) {
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
  }

  showAllTodos();

  //Show project specific todos

  

const titleOfProject = document.querySelector('.title-of-project')

  projectContainer.addEventListener("click", function(e){
    const target = e.target.closest("button").innerText;
    const target2 = e.target.closest("button");
    const allButtons = document.querySelectorAll("button");
    allButtons.forEach((element) => {
        element.classList.remove('clickedbutton');
      });
    target2.classList.add('clickedbutton');
    titleOfProject.textContent=target;
    const todoContainer = document.querySelector('.todos');
    if(target === "All projects") {
       
        while (todoContainer.firstChild) {
            todoContainer.removeChild(todoContainer.lastChild);
          }
         
        showAllTodos();
    } else{
        while (todoContainer.firstChild) {
            todoContainer.removeChild(todoContainer.lastChild);
          }
        for(let i=0; i<todoList.length;i++) {
            if(todoList[i].project == target){
                const todoContainer = document.querySelector('.todos');
                const oneTodo = document.createElement('div');
                oneTodo.classList.add('one-todo');
                if(todoList[i].done === 'true'){
                    oneTodo.classList.add('todo-done');
                }
                const todoCheckbox = document.createElement('input');
                todoCheckbox.type = 'checkbox';
                if(todoList[i].done === 'true'){
                    todoCheckbox.checked=true;
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
        else {
            
        }
    }
    
}
  });

  //Adding todo
  const addButton = document.querySelector('.new-todo');




const overlay = document.querySelector('#overlay');
const cross = document.querySelector('#cross');



function closeOverlay() {
    overlay.style.display = 'none';
    login.style.display = 'none';
    todoInfo.style.display = "none";
}
cross.addEventListener('click', closeOverlay);
overlay.addEventListener('click', closeOverlay);


const availableProjects = document.querySelector('#projects-available')


addButton.addEventListener('click', () => {
    overlay.style.display = 'block';
    login.style.display = 'block';
    while (availableProjects.firstChild) {
        availableProjects.removeChild(availableProjects.lastChild);
      }
    projectList.forEach(project => {
        var option = document.createElement("option");
        option.value = project.name;
        option.innerHTML = project.name;
        availableProjects.appendChild(option);
      });
});


//Adding new todo to the array
const formEl = document.querySelector('.form');
const submitTodo = document.querySelector('#submit');


function addNewTodo(event){
    event.preventDefault();
    const formData = new FormData(formEl);
    let title = formData.get('title');
    
    const found = todoList.some(el => el.title === title);
    if(found){
        alert("Todo already exists!");
        closeOverlay();
    } else {
    let description = formData.get('description');
    let dueDate = formData.get('dueDate')
    let project = formData.get('projects-available');
    console.log(formData.get('read'))
    if (formData.get('read') === null) {
        let newTodo = todosFactory(title,description,dueDate, 'green',project,'false')
        todoList.push(newTodo);
    } else {
        let newTodo = todosFactory(title,description,dueDate, 'green',project, 'true')
        todoList.push(newTodo);
    }

    const firstChild = document.querySelector('.project-list').firstElementChild;

    const allButtons = document.querySelectorAll("button");
    allButtons.forEach((element) => {
        element.classList.remove('clickedbutton');
      });
      
      firstChild.classList.add('clickedbutton');
      titleOfProject.innerText="All projects"
    closeOverlay();
    showAllTodos();
    formEl.reset();  
    }
}

submitTodo.addEventListener('click', addNewTodo);


// Removing todo

const todoContainer = document.querySelector('.todos');

todoContainer.addEventListener("click", function(e){
    const target = e.target.closest(".fa-trash"); 
    if(target){
     const toRemove = target.parentNode.innerText;        
    todoList = todoList.filter(function( obj ) {
    return obj.title !== toRemove;
    });
          showAllTodos();
    }
  });


todoContainer.addEventListener("click", function(e){
    const target = e.target.closest('input[type=checkbox]');
    if(target){
       if(target.parentNode.classList.contains('todo-done')){
       target.parentNode.classList.remove('todo-done')

       const toChange = target.parentNode.innerText;        
       for (var i=0; i<todoList.length; i++) {
           if (todoList[i].title == toChange){
               todoList[i].done = 'false'
           };
         }
    } else {
        target.parentNode.classList.add('todo-done');

        const toChange = target.parentNode.innerText;        
        for (var i=0; i<todoList.length; i++) {
            if (todoList[i].title == toChange){
                todoList[i].done = 'true'
            };
          }
         
         
    }

    }
  });


  // Selecting by the date today

  const todayBtn = document.querySelector('.today');

  function selectTodayTodos(){
    const todayDate = new Date();
    let day = todayDate.getDate().toString().padStart(2, "0");
    let month = (todayDate.getMonth() + 1).toString().padStart(2, "0");
    let year = todayDate.getFullYear();

    // This arrangement can be altered based on how we want the date's format to appear.
    let currentDate = `${year}-${month}-${day}`;
    while (todoContainer.firstChild) {
        todoContainer.removeChild(todoContainer.lastChild);
      }
    for(let i=0;i<todoList.length;i++){

        if(todoList[i].dueDate == currentDate){
            const todoContainer = document.querySelector('.todos');
            const oneTodo = document.createElement('div');
            oneTodo.classList.add('one-todo');
            if(todoList[i].done === 'true'){
                oneTodo.classList.add('todo-done');
            }
            const todoCheckbox = document.createElement('input');
            todoCheckbox.type = 'checkbox';
            if(todoList[i].done === 'true'){
                todoCheckbox.checked=true;
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
    }
    const allButtons = document.querySelectorAll("button");
    allButtons.forEach((element) => {
        element.classList.remove('clickedbutton');
      });
      todayBtn.classList.add('clickedbutton')
  }

  todayBtn.addEventListener('click', selectTodayTodos)

    // Selecting by the date this week

const weekBtn = document.querySelector('.week');

  function selectWeekTodos(){
    const todayDate = new Date();
    let day = todayDate.getDate().toString().padStart(2, "0");
    let month = (todayDate.getMonth() + 1).toString().padStart(2, "0");
    let year = todayDate.getFullYear();

    // This arrangement can be altered based on how we want the date's format to appear.
    let currentDate = `${year}-${month}-${day}`;

    const nextWeek= new Date()
    nextWeek.setDate(nextWeek.getDate()+7);
    let day2 = nextWeek.getDate().toString().padStart(2, "0");
    let month2 = (nextWeek.getMonth() + 1).toString().padStart(2, "0");
    let year2 = nextWeek.getFullYear();

    let nextWeekDate = `${year2}-${month2}-${day2}`;


    while (todoContainer.firstChild) {
        todoContainer.removeChild(todoContainer.lastChild);
      }
    for(let i=0;i<todoList.length;i++){
        if(todoList[i].dueDate >= currentDate && todoList[i].dueDate <= nextWeekDate){
            const todoContainer = document.querySelector('.todos');
            const oneTodo = document.createElement('div');
            oneTodo.classList.add('one-todo');
            if(todoList[i].done === 'true'){
                oneTodo.classList.add('todo-done');
            }
            const todoCheckbox = document.createElement('input');
            todoCheckbox.type = 'checkbox';
            if(todoList[i].done === 'true'){
                todoCheckbox.checked=true;
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
    }
    const allButtons = document.querySelectorAll("button");
    allButtons.forEach((element) => {
        element.classList.remove('clickedbutton');
      });
      weekBtn.classList.add('clickedbutton')
  }

  weekBtn.addEventListener('click', selectWeekTodos);


  // Checking description of Todo


  const todoCheck = document.querySelector('.todos');
  const todoInfo = document.querySelector('#info');
  const todoTitle= document.querySelector('#todo-title');
  const todoDescription= document.querySelector('#todo-description');
  const todoDuedate= document.querySelector('#todo-duedate');
  const todoProject= document.querySelector('#todo-project');
  const todoStatus= document.querySelector('#todo-status');

  

function showTodoDetails(e) {
    let todoName = e.target.innerText;
    for(let i=0; i<todoList.length;i++){
        while(todoList[i].title==todoName){
            overlay.style.display ="block";
            todoInfo.style.display = "block";
            todoTitle.innerText = todoList[i].title;
            todoDescription.innerText = todoList[i].description;
            todoDuedate.innerText = todoList[i].dueDate;
            todoProject.innerText = todoList[i].project;
            if(todoList[i].done=='true'){
                todoStatus.innerText = "Done!"
            }
            else {
                todoStatus.innerText = "Not done"
            }
            return;
        }
    }

};

todoCheck.addEventListener('click', showTodoDetails);


// Change the date


todoContainer.addEventListener('change', (e)=> {
   if(e.target.type == 'date'){
    let currentProject = e.target.parentNode.innerText;
  
    for(let i=0; i<todoList.length;i++){
        while(todoList[i].title==currentProject){
           todoList[i].dueDate = e.target.value;
            return;
        }
    }
   }
})
