import { ToDoManager, ToDoManagerImpl, Task, dummyProjects, dummyTasks } from '@/models';
import { View, ViewImpl } from '@/views';
import Controller from './controller';

export default class ControllerImpl implements Controller {
  private view: View;

  private toDoManager: ToDoManager;

  constructor() {
    this.toDoManager = new ToDoManagerImpl();
    this.toDoManager.projects = dummyProjects;
    this.toDoManager.tasks = dummyTasks;
    
    this.view = new ViewImpl(this, this.toDoManager);
    this.view.createView();
  }

  addProject(name: string): void {
    this.toDoManager.createProject(name);
    this.view.refresh();
  }

  addTaskToProject(dto: Omit<Task, 'id'>, projectId: number): void {
    this.toDoManager.createTaskToProject(dto, projectId);
    this.view.refresh();
  }

  setCompletedForTask(id: number, completed: boolean): void {
    this.toDoManager.setCompletedForTask(id, completed);
  }

  setArchivedForTask(id: number, archived: boolean): void {
    this.toDoManager.setCompletedForTask(id, archived);
    this.view.refresh();
  }
}
