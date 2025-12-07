document.addEventListener('DOMContentLoaded', function() {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    let tasks = [];

    function loadTasks() {
        const stored = localStorage.getItem('tasks');
        tasks = stored ? JSON.parse(stored) : [];
        tasks.forEach(taskText => addTask(taskText, false));
    }

    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function addTask(taskText, save = true) {
        if (!taskText) {
            alert('Please enter a task!');
            return;
        }

        const listItem = document.createElement('li');
        listItem.textContent = taskText;

        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.className = 'remove-btn';
        removeBtn.onclick = () => {
            const index = tasks.indexOf(taskText);
            if (index > -1) {
                tasks.splice(index, 1);
                taskList.removeChild(listItem);
                saveTasks();
            }
        };

        listItem.appendChild(removeBtn);
        taskList.appendChild(listItem);

        if (save) {
            tasks.push(taskText);
            saveTasks();
        }

        taskInput.value = '';
    }

    addButton.addEventListener('click', () => addTask(taskInput.value.trim()));
    taskInput.addEventListener('keypress', e => {
        if (e.key === 'Enter') addTask(taskInput.value.trim());
    });

    loadTasks();
});
