/* eslint-disable no-param-reassign */
import { ProjectItem, TaskItem } from '@/components';
import ProjectTagOption from '@/components/ProjectTagOption';
import Controller from '@/controllers/controller';
import { Task, TaskPriority } from '@/models';
import View from './view';

export default class ViewImpl implements View {
  private controller: Controller;

  projectUUIDActive: string = '';

  currentTaskItemElements: Element[];

  constructor(controller: Controller) {
    this.controller = controller;
  }

  refresh(): void {
    ViewImpl.reset();
    this.createView();
  }

  createView(): void {
    this.addProjectList();
    this.addProjectTitle();
    this.addTaskList();
    this.addEventListener();
  }

  addEventListener() {
    ViewImpl.addProjectEventListener();
    this.addProjectInputEventListener();
    ViewImpl.addTaskEventListener();
    this.addTaskItemEventListener();
    this.addDialogTaskProjectTagOption();
    this.addDialogTaskEventListener();
  }

  static addProjectEventListener() {
    const addProjectButton = document.getElementById('btn-add-project');
    addProjectButton.onclick = () => {
      const addProjectInput = document.getElementById('form-add-project');
      addProjectInput.classList.remove('hidden');
      addProjectInput.scrollIntoView();
      addProjectInput.focus();
    };
  }

  addProjectInputEventListener() {
    const deleteButton = document.getElementById('form-add-project-delete');

    deleteButton.onclick = () => {
      const addProjectInput = document.getElementById('form-add-project');
      addProjectInput.classList.add('hidden');
    };

    const formAddProject = document.getElementById('form-add-project');
    formAddProject.onsubmit = (e) => {
      e.preventDefault();

      // Get project name value
      const projectNameInput = document.getElementById(
        'form-add-project-input',
      ) as HTMLInputElement;
      const projectNameValue = projectNameInput.value;

      // Add new project
      this.controller.addProject(projectNameValue);

      // Clear input and close project name input
      const addProjectInput = document.getElementById(
        'form-add-project',
      ) as HTMLInputElement;
      addProjectInput.classList.add('hidden');
      projectNameInput.value = '';
    };
  }

  static addTaskEventListener() {
    const addTaskSvg = document.getElementById('svg-add-task');

    addTaskSvg.onclick = () => {
      const addTaskDialog = document.getElementById(
        'dialog-add-task',
      ) as HTMLDialogElement;
      addTaskDialog.showModal();
    };
  }

  addDialogTaskProjectTagOption() {
    const projectTagSelect = document.getElementById('project-tag');
    const projects = this.controller.findAllProject();

    projects.forEach((project) => {
      const projectOptionElement = new ProjectTagOption(
        project,
      ).toElement() as HTMLOptionElement;
      projectTagSelect.appendChild(projectOptionElement);
    });
  }

  addTaskItemEventListener() {
    const taskItemElements = this.currentTaskItemElements;

    taskItemElements.forEach((taskItem) => {
      const taskItemElement = taskItem as HTMLElement;
      const taskId = taskItemElement.dataset.uuid;
      const task = this.controller.findTask(taskId);

      this.addTaskItemDialogEventListener(taskItemElement, task);
      this.addTaskItemCheckboxEventListnere(taskItemElement, task);
    });
  }

  addTaskItemCheckboxEventListnere(taskItemElement: HTMLElement, task: Task) {
    const taskCheckbox = taskItemElement.querySelector(
      'input[type="checkbox"]',
    ) as HTMLInputElement;
    taskCheckbox.onclick = (e) => {
      e.stopPropagation();
      this.controller.setCompletedForTask(task.uuid, taskCheckbox.checked);
    };
  }

  addTaskItemDialogEventListener(taskItemElement: HTMLElement, task: Task) {
    taskItemElement.onclick = () => {
      const taskTitle = document.getElementById('task-title');
      const taskDueDate = document.getElementById('task-due-date');
      const taskPriority = document.getElementById('task-priority');
      const taskStatus = document.getElementById('task-status');
      const taskDescription = document.getElementById('task-description');

      // Fill the dialog with corresponding task information
      taskTitle.textContent = task.title;
      taskDueDate.textContent = task.dueDate.toDateString();
      taskPriority.textContent = task.priority;
      taskStatus.textContent = task.completed ? 'Complete' : 'Incomplete';
      taskDescription.textContent = task.description;

      // Set class for span
      const priorityColorList = {
        Low: 'bg-green-600 border-green-600',
        Medium: 'bg-amber-500 border-amber-500',
        High: 'bg-red-600 border-red-600',
      };
      const priorityColor = priorityColorList[task.priority];
      taskPriority.setAttribute(
        'class',
        `rounded-md border p-1 text-white ${priorityColor}`,
      );

      const taskStatusColor = task.completed
        ? 'bg-green-600 border-green-600'
        : 'bg-red-600 border-red-600';
      taskStatus.setAttribute(
        'class',
        `rounded-md border p-1 text-white ${taskStatusColor}`,
      );

      const taskDialog = document.getElementById(
        'task-dialog',
      ) as HTMLDialogElement;
      taskDialog.showModal();

      // Form event listener
      const taskDialogForm = document.getElementById(
        'form-task',
      ) as HTMLFormElement;
      ViewImpl.addDialogBoundClose(taskDialog, taskDialogForm);
      taskDialogForm.onsubmit = (e) => {
        const formMethod = e.submitter.getAttribute('formmethod');
        if (formMethod === 'dialog') {
          taskDialogForm.reset();
          return;
        }

        e.preventDefault();

        this.controller.setArchivedForTask(task.uuid, true);
      };
    };
  }

  addDialogTaskEventListener() {
    const dialogTask = document.getElementById(
      'dialog-add-task',
    ) as HTMLDialogElement;
    const formDialogTask = document.getElementById(
      'form-add-task',
    ) as HTMLFormElement;

    ViewImpl.addDialogBoundClose(dialogTask, formDialogTask);

    const addTaskForm = document.getElementById(
      'form-add-task',
    ) as HTMLFormElement;
    addTaskForm.onsubmit = (e) => {
      const formMethod = e.submitter.getAttribute('formmethod');
      if (formMethod === 'dialog') {
        addTaskForm.reset();
        return;
      }

      e.preventDefault();

      const formData = new FormData(addTaskForm as HTMLFormElement);
      const title = formData.get('title').toString();
      const dueDate = new Date(formData.get('due-date').toString());
      const priority = formData.get('priority').toString() as TaskPriority;
      const description = formData.get('description').toString();
      const projectTagID = formData.get('project-tag').toString();
      const project = this.controller.findProject(projectTagID);

      // Create new Task
      const newTask: Omit<Task, 'uuid'> = {
        title,
        dueDate,
        priority,
        description,
        completed: false,
        archived: false,
        projectTag: project.name,
      };
      this.controller.addTaskToProject(newTask, projectTagID);

      addTaskForm.reset();
      dialogTask.close();
    };
  }

  static addDialogBoundClose(dialog: HTMLDialogElement, form: HTMLFormElement) {
    dialog.onclick = (e) => {
      const dialogDimensions = dialog.getBoundingClientRect();
      if (
        e.clientX < dialogDimensions.left ||
        e.clientX > dialogDimensions.right ||
        e.clientY < dialogDimensions.top ||
        e.clientY > dialogDimensions.bottom
      ) {
        dialog.close();
        form.reset();
      }
    };
  }

  addProjectList() {
    const projectListUl = document.getElementById('project-list');
    const projects = this.controller.findAllProject();
    const projectItemElemets = projects.map((project) =>
      new ProjectItem(project).toElement(),
    );

    projectListUl.appendChild(
      new ProjectItem(this.controller.getDefaultProject()).toElement(),
    );

    projectItemElemets.forEach((projectItem) =>
      projectListUl.appendChild(projectItem),
    );
  }

  addTaskList() {
    const taskListDiv = document.getElementById('task-list');

    const tasks =
      this.projectUUIDActive === ''
        ? this.controller.findAllTask()
        : this.controller.findAllTaskInProject(this.projectUUIDActive);
    const taskItemElements = tasks.map((task) =>
      new TaskItem(task).toElement(),
    );

    this.currentTaskItemElements = taskItemElements;

    taskItemElements.forEach((taskItem) => {
      taskListDiv.appendChild(taskItem);
    });
  }

  addProjectTitle(): void {
    const taskTitleSpan = document.getElementById('project-title');

    if (this.projectUUIDActive === '') {
      taskTitleSpan.textContent = 'All';
      return;
    }

    const project = this.controller.findProject(this.projectUUIDActive);
    taskTitleSpan.textContent = project.name;
  }

  static reset(): void {
    ViewImpl.resetProjectList();
    ViewImpl.resetProjectTitle();
    ViewImpl.resetTaskList();
    ViewImpl.resetDialogTaskProjectTagOption();
  }

  static resetProjectList() {
    const projectListUl = document.getElementById('project-list');
    projectListUl.innerHTML = '';
  }

  static resetTaskList() {
    const taskListDiv = document.getElementById('task-list');
    taskListDiv.innerHTML = '';
  }

  static resetProjectTitle() {
    const taskTitleSpan = document.getElementById('project-title');
    taskTitleSpan.innerHTML = '';
  }

  static resetDialogTaskProjectTagOption() {
    const projectTagSelect = document.getElementById('project-tag');
    projectTagSelect.innerHTML = '';
  }
}
