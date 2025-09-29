// function to load all tasks from the backend 
async function loadTasks(){
// Fetch tasks from our Express server (/tasks endpoint) 
    const res = await fetch('/tasks');
    const tasks = await res.json();
// selecting the ul element where we will display tasks
const list = document.getElementById('taskList');
list.innerHTML = ''; //clearing existing list before re-rendering
//  so we dont stack duplicates

// loop thru each task and create a list item
tasks.forEach(t => {  // FIXED: was "task" should be "tasks"
    const li = document.createElement('li');
    li.textContent = t.text; 
// line 16 add delete button next to each task
    const del = document.createElement('button');  // FIXED: missing closing parenthesis
        del.textContent ='X'// small delete icon
        del.onclick = async () => {
            //once user clicks this would send delete request to server
            await fetch(`/tasks/${t.id}`, { method: 'DELETE'});  // FIXED: use backticks for template literal
            loadTasks(); // reload task after deleting
        
        };
// add/append delete button to the task list item   
 li.appendChild(del);
    list.appendChild(li);
  });
}

// Function to add a new task
async function addTask() {
  // Get the value from the input box
  const text = document.getElementById('taskInput').value;

  // Guard clause: don't add empty tasks
  if (!text) return;

  // Send POST request to server with the task text
  await fetch('/tasks', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text })
  });
  