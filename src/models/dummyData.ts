import { Project } from './project';
import { Task } from './task';

const tasks: Task[] = [
  {
    uuid: 'd8c66223-a577-4607-b183-890300ff89f0',
    title: 'Title',
    dueDate: new Date('2024-01-04T12:30:00'),
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    priority: 'High',
    completed: false,
    archived: false,
    projectTag: 'Project Tag 0',
  },
  {
    uuid: 'd8c66223-a577-4607-b183-890300ff89f1',
    title: 'Title',
    dueDate: new Date('2024-01-04T12:30:00'),
    description: 'Description',
    priority: 'Medium',
    completed: false,
    archived: false,
    projectTag: 'Project Tag 1',
  },
  {
    uuid: 'd8c66223-a577-4607-b183-890300ff89f2',
    title: 'Title',
    dueDate: new Date('2024-01-04T12:30:00'),
    description: 'Description',
    priority: 'Low',
    completed: false,
    archived: false,
    projectTag: 'Project Tag 2',
  },
];

const projects: Project[] = [
  {
    uuid: 'd8c66223-a577-4607-b183-890300ff89f3',
    name: 'Project Tag 0',
    tasks: [tasks[0]],
  },
  {
    uuid: 'd8c66223-a577-4607-b183-890300ff89f4',
    name: 'Project Tag 1',
    tasks: [tasks[1]],
  },
  {
    uuid: 'd8c66223-a577-4607-b183-890300ff89f5',
    name: 'Project Tag 2',
    tasks: [tasks[2]],
  },
];

export const dummyTasks: Map<string, Task> = new Map();

tasks.forEach((task) => {
  dummyTasks.set(task.uuid, task);
});

export const dummyProjects: Map<string, Project> = new Map();

projects.forEach((project) => {
  dummyProjects.set(project.uuid, project);
});
