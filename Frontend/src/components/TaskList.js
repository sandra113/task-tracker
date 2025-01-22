import React from 'react';

function TaskList({ tasks, onEdit, onDelete }) {
  return (
    <div>
      <h3>Task List</h3>
      {tasks.length === 0 ? (
        <p>No tasks available</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <div>
                <h4>{task.title}</h4>
                <p>{task.description}</p>
                <button onClick={() => onEdit(task.id)}>Edit</button>
                <button onClick={() => onDelete(task.id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TaskList;
