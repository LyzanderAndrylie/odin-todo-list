import { ProjectItem, TaskItem } from '@/components';
import Controller from '@/controllers/controller';
import { ToDoManager } from '@/models/manager';
import View from './view';

export default class ViewImpl implements View {
  private controller: Controller;

  private toDoManager: ToDoManager;

  projectIdActive: number = -1;

  constructor(controller: Controller, toDoManager: ToDoManager) {
    this.controller = controller;
    this.toDoManager = toDoManager;
  }

  refresh(): void {
    ViewImpl.reset();
    this.createView();
    this.addEventListener();
  }

  createView(): void {
    this.addProjectList();
    this.addProjectTitle();
    this.addTaskList();
  }

  addEventListener() {
    this.addProjectEventListener();
    this.addTaskEventListener();
    this.addTaskItemEventListener();
  }

  addProjectEventListener() {

  }

  addProjectInputEventListener() {

  }

  addTaskEventListener() {

  }

  addTaskItemEventListener() {

  }

  addProjectList() {
    const projectList = document.getElementById('project-list');
    const projectTags = this.toDoManager.findAllProjectTag();
    const projectItemElemets = projectTags.map((project) =>
      new ProjectItem(project).toElement(),
    );

    projectList.appendChild(new ProjectItem('All').toElement())

    projectItemElemets.forEach((projectItem) =>
      projectList.appendChild(projectItem),
    );
  }

  addTaskList() {
    const taskList = document.getElementById('task-list');

    const tasks =
      this.projectIdActive === -1
        ? this.toDoManager.findAllTask()
        : this.toDoManager.findAllTaskInProject(this.projectIdActive);
    const taskItemElements = tasks.map((task) =>
      new TaskItem(task).toElement(),
    );

    taskItemElements.forEach((taskItem) => taskList.appendChild(taskItem));
  }

  addProjectTitle(): void {
    const taskTitle = document.getElementById('project-title');

    if (this.projectIdActive === -1) {
      taskTitle.textContent = 'All';
      return;
    }

    const project = this.toDoManager.findProject(this.projectIdActive);
    taskTitle.textContent = project.name;
  }

  static reset(): void {
    ViewImpl.resetProjectList();
    ViewImpl.resetProjectTitle();
    ViewImpl.resetTaskList();
  }

  static resetProjectList() {
    const projectList = document.getElementById('project-list');
    projectList.innerHTML = '';
  }

  static resetTaskList() {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';
  }

  static resetProjectTitle() {
    const taskTitle = document.getElementById('project-title');
    taskTitle.innerHTML = '';
  }
}
