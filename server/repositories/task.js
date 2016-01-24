import uuid from 'node-uuid';

/*
taskRepository = {
  groupId: [
    task,
    task,
  ]
}

task = {
  data: task data,
  budget: remaining budget,
  limit: performing limit for worker after assignment
}
*/
const taskRepository = {};

const createTaskGroup = tasks => {
  tasks.forEach(task => {
    task.id = uuid();
  });

  const groupId = uuid();
  taskRepository[groupId] = tasks;

  return groupId;
};

const getAllTasks = () => taskRepository;
const getTaskGroup = groupId => taskRepository[groupId] || null;
const getTasks = ids => {
  const tasks = [];
  ids.forEach(id => {
    const task = getTask(id);
    if (task !== null) {
      tasks.push(task);
    }
  });
  return tasks;
};
const getTask = id => {
  for (let taskGroup of taskRepository) {
    const task = taskGroup.find(task => task.id === id);
    if (task !== null) {
      return task;
    }
  }
  return null;
};

export {
  createTaskGroup,
  getTaskGroup,
  getTasks,
  getTask
};
