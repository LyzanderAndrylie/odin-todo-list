import { Project } from './project';
import { Task } from './task';

export const dummyTasks: Task[] = [
  {
    id: 0,
    title: 'Title',
    dueDate: new Date('2024-01-04T12:30:00'),
    description: 'Description',
    priority: 'High',
    completed: false,
    archived: false,
    projectTag: 'Project Tag 0',
  },
  {
    id: 1,
    title: 'Title',
    dueDate: new Date('2024-01-04T12:30:00'),
    description: 'Description',
    priority: 'Medium',
    completed: false,
    archived: false,
    projectTag: 'Project Tag 1',
  },
  {
    id: 2,
    title: 'Title',
    dueDate: new Date('2024-01-04T12:30:00'),
    description: 'Description',
    priority: 'Low',
    completed: false,
    archived: false,
    projectTag: 'Project Tag 2',
  },
];

export const dummyProjects: Project[] = [
  {
    id: 0,
    name: 'Project Tag 0',
    tasks: [dummyTasks[0]],
  },
  {
    id: 1,
    name: 'Project Tag 1',
    tasks: [dummyTasks[1]],
  },
  {
    id: 2,
    name: 'Project Tag 2',
    tasks: [dummyTasks[2]],
  },
];
