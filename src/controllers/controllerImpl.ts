import {
  ToDoManager,
  ToDoManagerImpl,
  Task,
  dummyProjects,
  dummyTasks,
  Project,
} from '@/models';
import { View, ViewImpl } from '@/views';
import Controller from './controller';

export default class ControllerImpl implements Controller {
  private view: View;

  private toDoManager: ToDoManager;

  constructor() {
    this.toDoManager = new ToDoManagerImpl();
    this.toDoManager.projects = dummyProjects;
    this.toDoManager.tasks = dummyTasks;

    this.view = new ViewImpl(this);
    this.view.createView();
  }

  addProject(name: string): void {
    this.toDoManager.createProject(name);
    this.view.refresh();
  }

  addTaskToProject(dto: Omit<Task, 'id'>, projectUUID: string): void {
    this.toDoManager.createTaskToProject(dto, projectUUID);
    this.view.refresh();
  }

  setCompletedForTask(uuid: string, completed: boolean): void {
    this.toDoManager.setCompletedForTask(uuid, completed);
  }

  setArchivedForTask(uuid: string, archived: boolean): void {
    this.toDoManager.setArchivedForTask(uuid, archived);
    this.view.refresh();
  }

  findAllProject(): Project[] {
    return this.toDoManager.findAllProject();
  }

  findAllProjectTag(): string[] {
    return this.toDoManager.findAllProjectTag();
  }

  findAllTask(): Task[] {
    return this.toDoManager.findAllTask();
  }

  findAllTaskInProject(projectUUID: string): Task[] {
    return this.toDoManager.findAllTaskInProject(projectUUID);
  }

  findProject(projectUUID: string): Project {
    return this.toDoManager.findProject(projectUUID);
  }

  findTask(uuid: string): Task {
    return this.toDoManager.findTask(uuid);
  }

  findAllTaskToday(): Task[] {
    return this.toDoManager.findAllTaskToday();
  }

  findAllTaskUpcoming(): Task[] {
    return this.toDoManager.findAllTaskUpcoming();
  }

  findAllArchivedTask(): Task[] {
    return this.toDoManager.findAllArchivedTask();
  }

  getDefaultProject(): Project {
    return this.toDoManager.defaultProject;
  }
}
