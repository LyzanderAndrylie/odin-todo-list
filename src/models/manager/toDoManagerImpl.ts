import ToDoManager from './toDoManager';
import { Project } from '../project';
import { Task } from '../task';

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
    const projectTagUnique = projectTag.filter((value, index, array) => array.indexOf(value) === index);
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

    return task;
  }

  findTask(uuid: string): Task {
    return this.tasks.get(uuid);
  }

  findAllTask(): Task[] {
    return Array.from(this.tasks.values());
  }

  findAllTaskInProject(projectUUID: string): Task[] {
    const project = this.findProject(projectUUID);
    return project.tasks;
  }

  setCompletedForTask(uuid: string, completed: boolean): void {
    const task = this.findTask(uuid);
    task.completed = completed;
  }

  setArchivedForTask(uuid: string, completed: boolean): void {
    const task = this.findTask(uuid);
    task.archived = completed;
  }
}
