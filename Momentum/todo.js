const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";

function filterFn(toDo) {
  return toDo.id === 1;
}

let toDos = [];

function deleteToDo(event) {
  const btn = event.target;
  const div = btn.parentNode;
  toDoList.removeChild(div);
  const cleanToDos = toDos.filter(function(toDo){
      return toDo.id !== parseInt(div.id);
  });
  toDos = cleanToDos
  saveToDos()
}

function saveToDos() {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintToDo(text) {
  const div = document.createElement("div");
  const delBtn = document.createElement("button");
  delBtn.className="js-delBtn"
  const newId = toDos.length + 1;
  delBtn.innerText = "-";
  delBtn.addEventListener("click", deleteToDo);
  const span = document.createElement("span");
  span.innerText = text;
  div.appendChild(span);
  div.appendChild(delBtn);
  div.id = newId;
  toDoList.appendChild(div);
  const toDoObj = {
    text: text,
    id: newId
  };
  toDos.push(toDoObj);
  saveToDos();
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue);
  toDoInput.value = "";
}

function loadToDos() {
  const loadedToDos = localStorage.getItem(TODOS_LS);
  if (loadedToDos !== null) {
    const parseToDos = JSON.parse(loadedToDos);
    parseToDos.forEach(function(toDo) {
      paintToDo(toDo.text);
    });
  }
}

function init() {
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit);
}
init();
