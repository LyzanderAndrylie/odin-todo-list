import ToDoManager from './toDoManager';
import { Project } from '../project';
import { Task } from '../task';

export default class ToDoManagerImpl implements ToDoManager {
  private projectIdCounter: number = 0;

  private TaskIdCounter: number = 0;

  projects: Project[] = [];

  tasks: Task[] = [];

  createProject(name: string): Project {
    const project: Project = {
      id: this.projectIdCounter,
      name,
      tasks: [],
    };
    this.projects.push(project);
    this.projectIdCounter += 1;

    return project;
  }

  findProject(id: number): Project {
    return this.projects[id];
  }

  findAllProject(): Project[] {
    return this.projects;
  }

  findAllProjectTag(): string[] {
    const projectTag = this.projects.map((project) => project.name);
    const projectTagUnique = projectTag.filter((value, index, array) => array.indexOf(value) === index);
    return projectTagUnique;
  }

  createTaskToProject(dto: Omit<Task, 'id'>, projectId: number): Task {
    const project = this.findProject(projectId);
    const task: Task = {
      id: this.TaskIdCounter,
      title: dto.title,
      description: dto.description,
      dueDate: dto.dueDate,
      priority: dto.priority,
      completed: dto.completed,
      archived: dto.archived,
      projectTag: project.name,
    };

    project.tasks.push(task);
    this.tasks.push(task);

    this.TaskIdCounter += 1;

    return task;
  }

  findTask(id: number): Task {
    return this.tasks[id];
  }

  findAllTask(): Task[] {
    return this.tasks;
  }

  findAllTaskInProject(projectId: number): Task[] {
    const project = this.findProject(projectId);
    return project.tasks;
  }

  setCompletedForTask(id: number, completed: boolean): void {
    const task = this.findTask(id);
    task.completed = completed;
  }

  setArchivedForTask(id: number, completed: boolean): void {
    const task = this.findTask(id);
    task.archived = completed;
  }
}
