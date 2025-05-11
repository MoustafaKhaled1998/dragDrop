document.querySelector("#textVal").focus();
var addBtn = document.querySelector(".add-project-btn");
addBtn.addEventListener('click', function () { addNewFn() });
var containers = document.getElementsByClassName('tasksSection');
for (let i = 0; i < containers.length; i++) {
    containers[i].addEventListener('drop', dropFn);
    containers[i].addEventListener('dragover', dragOverFn);
}

var counter = 0;
var localAr = []

// stop refresh from button

var formMain = document.querySelector("form");
formMain.addEventListener('submit', stopForm);
function stopForm(e) { e.preventDefault()};

// localStorage Start

if(localStorage.length !== 0){
    counter = JSON.parse(localStorage.getItem("counter"));
    localAr = JSON.parse(localStorage.getItem("tasks"))
    for(var i =0 ; i <localAr.length; i++){
        createAndAppend(localAr[i].title, localAr[i].taskId , localAr[i].containerId)
    }
}

// add button

function addNewFn() {
    counter++;
    var inputTask = document.querySelector("#textVal").value;
    createAndAppend(inputTask,counter,"progress")
    addToAr(inputTask,counter, "progress")
    addtoLocal();
    document.querySelector("#textVal").value = ''
}

// create element and append

function createAndAppend(title , taskId , containerId){
 var newTask = document.createElement("li");
    newTask.setAttribute("draggable", "true")
    newTask.id = taskId;
    newTask.textContent = title;
    newTask.addEventListener('dragstart', dragStartFn);
    var container = document.getElementById(containerId);
    container.appendChild(newTask);
}


// drag to container functions

function dragStartFn(e) {
    e.dataTransfer.setData('text', e.target.id);
}
function dragOverFn(e) {
    e.preventDefault();
}
function dropFn(e) {
    var taskId = e.dataTransfer.getData('text');
    var dragedItem = document.getElementById(taskId);
    this.appendChild(dragedItem);
    refreshLocal(taskId, e.toElement.id)
}


// localStorage functions


function addToAr (title , taskId , containerId){
    localAr.push({title:title ,taskId:taskId, containerId : containerId})
}
function addtoLocal (){
    localStorage.setItem("tasks",JSON.stringify(localAr))
    localStorage.setItem("counter",JSON.stringify(counter))
}
function refreshLocal(taskId , containerId){
    var i = localAr.findIndex(function(ar) {
return Number(ar.taskId) === Number(taskId);
});
if (i !== -1) {
  localAr[i].containerId = containerId;
  addtoLocal();
}
}
