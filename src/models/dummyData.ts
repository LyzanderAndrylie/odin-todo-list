import { Project } from './project';
import { Task } from './task';

const today = new Date();
const nextWeek = new Date();
const prevWeek = new Date();

nextWeek.setDate(today.getDate() + 7);
prevWeek.setDate(today.getDate() - 7);

const learningTask: Task[] = [
  {
    uuid: 'd8c66223-a577-4607-b183-890300ff89f0',
    title: 'The Odin Project',
    dueDate: today,
    description:
      "I'm currently diving into The Odin Project to enhance my coding skills. This task involves completing various modules, including web development, JavaScript, and more. I'll be working on projects, completing exercises, and engaging with the community to level up my programming expertise.",
    priority: 'High',
    completed: false,
    archived: false,
    projectTag: 'Learning',
  },
  {
    uuid: 'd8c66223-a577-4607-b183-890300ff89f1',
    title: 'Frontend and Backend',
    dueDate: nextWeek,
    description:
      'This task involves mastering both frontend and backend development to become a full-stack developer. The goal is to gain proficiency in various technologies, frameworks, and languages required for building robust web applications.',
    priority: 'Medium',
    completed: false,
    archived: false,
    projectTag: 'Learning',
  },
  {
    uuid: 'd8c66223-a577-4607-b183-890300ff89f2',
    title: 'TypeScript',
    dueDate: nextWeek,
    description:
      "The task involves diving into TypeScript, a superset of JavaScript that introduces static typing and additional features to JavaScript development. The goal is to gain a solid understanding of TypeScript's syntax, features, and its advantages in building scalable and maintainable applications.",
    priority: 'Low',
    completed: true,
    archived: false,
    projectTag: 'Learning',
  },
  {
    uuid: 'd8c66223-a577-4607-b183-890300ff89f3',
    title: 'JavaScript',
    dueDate: prevWeek,
    description:
      "This task involves mastering JavaScript, a versatile programming language used extensively in web development. The goal is to gain a strong foundation in JavaScript's core concepts, syntax, and various functionalities essential for building interactive and dynamic web applications.",
    priority: 'Low',
    completed: true,
    archived: true,
    projectTag: 'Learning',
  },
];

const gamingTask: Task[] = [
  {
    uuid: 'd8c66223-a577-4607-b183-890300ff89f4',
    title: 'Valorant',
    dueDate: today,
    description:
      "This task involves engaging in the tactical first-person shooter game Valorant. The goal is to improve skills, strategize gameplay, and enjoy competitive matches within the game's dynamic environment.",
    priority: 'Low',
    completed: false,
    archived: false,
    projectTag: 'Gaming',
  },
  {
    uuid: 'd8c66223-a577-4607-b183-890300ff89f5',
    title: 'VS Code',
    dueDate: prevWeek,
    description:
      'Engaging in the task of "Playing VS Code" involves exploring and mastering the features, extensions, and productivity tools within the Visual Studio Code (VS Code) editor. The goal is to optimize workflow, customize the editor for efficient coding, and discover its vast ecosystem of extensions.',
    priority: 'Low',
    completed: true,
    archived: true,
    projectTag: 'Gaming',
  },
];

const tasks: Task[] = [...learningTask, ...gamingTask]

const projects: Project[] = [
  {
    uuid: 'e8c66223-a577-4607-b183-890300ff89f0',
    name: 'Learning',
    tasks: [...learningTask],
  },
  {
    uuid: 'e8c66223-a577-4607-b183-890300ff89f1',
    name: 'Gaming',
    tasks: [...gamingTask],
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
