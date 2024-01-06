import { dummyProjects, dummyTasks } from '../dummyData';
import { Project } from '../project';
import { Task } from '../task';
import ToDoManager from './toDoManager';

export default class ToDoManagerImpl implements ToDoManager {
  defaultProject: Project = { uuid: '', name: 'All', tasks: [] };

  projects: Map<string, Project> = new Map();

  tasks: Map<string, Task> = new Map();

  createProject(name: string): Project {
    const project: Project = {
      uuid: crypto.randomUUID(),
      name,
      tasks: [],
    };
    this.projects.set(project.uuid, project);

    // Updates the projects' data in localStorage.
    // Note: For a more advanced approach, consider using decorators.
    this.saveToLocalStorage();

    return project;
  }

  findProject(uuid: string): Project {
    return this.projects.get(uuid);
  }

  findAllProject(): Project[] {
    return Array.from(this.projects.values());
  }

  findAllProjectTag(): string[] {
    const projectTag = this.findAllProject().map((project) => project.name);
    const projectTagUnique = projectTag.filter(
      (value, index, array) => array.indexOf(value) === index,
    );
    return projectTagUnique;
  }

  createTaskToProject(dto: Omit<Task, 'uuid'>, projectUUID: string): Task {
    const project = this.findProject(projectUUID);
    const task: Task = {
      uuid: crypto.randomUUID(),
      title: dto.title,
      description: dto.description,
      dueDate: dto.dueDate,
      priority: dto.priority,
      completed: dto.completed,
      archived: dto.archived,
      projectTag: project.name,
    };

    project.tasks.push(task);
    this.tasks.set(task.uuid, task);

    // Updates the projects' data in localStorage.
    // Note: For a more advanced approach, consider using decorators.
    this.saveToLocalStorage();

    return task;
  }

  findTask(uuid: string): Task {
    return this.tasks.get(uuid);
  }

  findAllTask(): Task[] {
    return Array.from(this.tasks.values()).filter((task) => !task.archived);
  }

  findAllTaskInProject(projectUUID: string): Task[] {
    const project = this.findProject(projectUUID);
    return project.tasks.filter((task) => !task.archived);
  }

  findAllTaskToday(): Task[] {
    const today = new Date();
    const tasks = this.findAllTask();

    return tasks.filter(
      (task) =>
        today.getFullYear() === task.dueDate.getFullYear() &&
        today.getMonth() === task.dueDate.getMonth() &&
        today.getDate() === task.dueDate.getDate(),
    );
  }

  findAllTaskUpcoming(): Task[] {
    const today = new Date();
    const tasks = this.findAllTask();

    return tasks.filter(
      (task) =>
        today.getFullYear() !== task.dueDate.getFullYear() ||
        today.getMonth() !== task.dueDate.getMonth() ||
        today.getDate() !== task.dueDate.getDate(),
    );
  }

  findAllArchivedTask(): Task[] {
    return Array.from(this.tasks.values()).filter((task) => task.archived);
  }

  setCompletedForTask(uuid: string, completed: boolean): void {
    const task = this.findTask(uuid);
    task.completed = completed;

    // Updates the projects' data in localStorage.
    // Note: For a more advanced approach, consider using decorators.
    this.saveToLocalStorage();
  }

  setArchivedForTask(uuid: string, archived: boolean): void {
    const task = this.findTask(uuid);
    task.archived = archived;

    // Updates the projects' data in localStorage.
    // Note: For a more advanced approach, consider using decorators.
    this.saveToLocalStorage();
  }

  loadFromLocalStorage(): void {
    const projectsJSON = localStorage.getItem('projects');
    if (!projectsJSON) {
      this.populateLocalStorageWithDummyData();
      return;
    }

    // Populate projects and tasks
    const projects = JSON.parse(projectsJSON) as Project[];
    projects.forEach((project) => {
      this.projects.set(project.uuid, project);

      project.tasks.forEach((task) => {
        task.dueDate = new Date(task.dueDate);
        this.tasks.set(task.uuid, task);
      });
    });
  }

  populateLocalStorageWithDummyData(): void {
    this.projects = dummyProjects;
    this.tasks = dummyTasks;
    this.saveToLocalStorage();
  }

  saveToLocalStorage(): void {
    const projectArray = Array.from(this.projects.values());
    const projectArrayJSON = JSON.stringify(projectArray);
    localStorage.setItem('projects', projectArrayJSON);
  }
}
