document.addEventListener('DOMContentLoaded', function() {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    let tasks = [];

    function loadTasks() {
        const stored = localStorage.getItem('tasks');
        tasks = stored ? JSON.parse(stored) : [];
        tasks.forEach(text => addTask(text, false));
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

        // Attach removal logic directly to the button
        removeBtn.onclick = () => {
            taskList.removeChild(listItem);
            const index = tasks.indexOf(taskText);
            if (index > -1) {
                tasks.splice(index, 1);
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
