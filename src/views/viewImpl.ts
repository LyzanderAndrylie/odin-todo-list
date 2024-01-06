/* eslint-disable no-param-reassign */
import { ProjectItem, TaskItem } from '@/components';
import ProjectTagOption from '@/components/ProjectTagOption';
import Controller from '@/controllers/controller';
import { Task, TaskPriority } from '@/models';
import { format } from 'date-fns';
import View from './view';

type Bar = 'Today' | 'Upcoming' | 'Archived' | 'My Projects';

type Strategy = () => Task[];

export default class ViewImpl implements View {
  controller: Controller;

  projectUUIDActive: string = '';

  currentTaskItemElements: Element[] = [];

  currentProjectItemElements: Element[] = [];

  currentBarActive: Bar = 'My Projects';

  findTaskStrategy: Map<Bar, Strategy> = new Map([
    ['Today', () => this.controller.findAllTaskToday()],
    ['Upcoming', () => this.controller.findAllTaskUpcoming()],
    ['Archived', () => this.controller.findAllArchivedTask()],
    [
      'My Projects',
      () =>
        this.projectUUIDActive === ''
          ? this.controller.findAllTask()
          : this.controller.findAllTaskInProject(this.projectUUIDActive),
    ],
  ]);

  constructor(controller: Controller) {
    this.controller = controller;
  }

  getTask(): Task[] {
    return this.findTaskStrategy.get(this.currentBarActive)();
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
    this.addProjectItemEventListener();
    this.addProjectInputEventListener();
    ViewImpl.addTaskEventListener();
    this.addTaskItemEventListener();
    this.addDialogTaskProjectTagOption();
    this.addDialogTaskEventListener();
    this.addBarEventListener();
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

  addProjectItemEventListener() {
    this.currentProjectItemElements.forEach((projectItem) => {
      const projectItemElement = projectItem as HTMLElement;
      projectItemElement.onclick = () => {
        const projectItemUUID = projectItemElement.dataset.uuid;
        this.projectUUIDActive = projectItemUUID;
        this.currentBarActive = 'My Projects';
        this.refresh();
      };
    });
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
      const formData = new FormData(formAddProject as HTMLFormElement);
      const projectNameValue = formData.get('project') as string;

      // Check new project name
      const currentProjectTags = this.controller.findAllProjectTag();
      if (currentProjectTags.includes(projectNameValue) || projectNameValue === 'All') {
        alert('New Project Name must be unique');
        return;
      }

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

  addTaskItemEventListener() {
    this.currentTaskItemElements.forEach((taskItem) => {
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
      const formattedDate = format(task.dueDate, 'EEEE, d MMMM yyyy — HH:mm');
      taskDueDate.textContent = formattedDate;
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

      const taskCTAButton = document.getElementById('task-cta');
      taskCTAButton.textContent =
        this.currentBarActive !== 'Archived' ? 'Archive' : 'Unarchive';

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

        this.controller.setArchivedForTask(
          task.uuid,
          this.currentBarActive !== 'Archived',
        );
        taskDialog.close();
      };
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

      // Set default selected option
      const optionValue = projectOptionElement.value;
      projectOptionElement.defaultSelected =
        this.projectUUIDActive === optionValue;
    });
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

  addBarEventListener() {
    const todayBar = document.getElementById('today');
    const upcomingBar = document.getElementById('upcoming');
    const archivedBar = document.getElementById('archived');

    todayBar.onclick = () => {
      this.currentBarActive = 'Today';
      todayBar.setAttribute(
        'class',
        'p-4 bg-tussock-500 text-white hover:bg-tussock-600 hover:text-white',
      );
      this.refresh();
    };

    upcomingBar.onclick = () => {
      this.currentBarActive = 'Upcoming';
      upcomingBar.setAttribute(
        'class',
        'p-4 bg-tussock-500 text-white hover:bg-tussock-600 hover:text-white',
      );
      this.refresh();
    };

    archivedBar.onclick = () => {
      this.currentBarActive = 'Archived';
      archivedBar.setAttribute(
        'class',
        'p-4 bg-tussock-500 text-white hover:bg-tussock-600 hover:text-white',
      );
      this.refresh();
    };
  }

  addProjectList() {
    const projectListUl = document.getElementById('project-list');
    const projects = this.controller.findAllProject();
    const projectItemElemets = projects.map((project) =>
      new ProjectItem(project).toElement(),
    );

    const defaultProjectItem = new ProjectItem(
      this.controller.getDefaultProject(),
    ).toElement();

    // Add default project item
    const projectItems: Element[] = [];
    projectListUl.appendChild(defaultProjectItem);
    projectItems.push(defaultProjectItem);

    // Set default project item as active
    if (
      this.currentBarActive === 'My Projects' &&
      this.projectUUIDActive === ''
    ) {
      defaultProjectItem.setAttribute(
        'class',
        'mb-2 rounded-xl p-2 bg-tussock-500 hover:bg-tussock-600 active:bg-tussock-700 text-white',
      );
    }

    projectItemElemets.forEach((projectItem) => {
      projectListUl.appendChild(projectItem);

      // set project item as active
      const projectItemUUID = (projectItem as HTMLElement).dataset.uuid;

      if (
        this.currentBarActive === 'My Projects' &&
        this.projectUUIDActive === projectItemUUID
      ) {
        projectItem.setAttribute(
          'class',
          'mb-2 rounded-xl p-2 bg-tussock-500 hover:bg-tussock-600 active:bg-tussock-700 text-white',
        );
      }

      projectItems.push(projectItem);
    });

    this.currentProjectItemElements = projectItems;
  }

  addTaskList() {
    const taskListDiv = document.getElementById('task-list');
    const tasks = this.getTask();
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
    ViewImpl.resetBarActive();
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

  static resetBarActive() {
    const todayBar = document.getElementById('today');
    const upcomingBar = document.getElementById('upcoming');
    const archivedBar = document.getElementById('archived');

    todayBar.setAttribute(
      'class',
      'p-4 hover:bg-tussock-500 active:bg-tussock-500 hover:text-white',
    );
    upcomingBar.setAttribute(
      'class',
      'p-4 hover:bg-tussock-500 active:bg-tussock-500 hover:text-white',
    );
    archivedBar.setAttribute(
      'class',
      'p-4 hover:bg-tussock-500 active:bg-tussock-500 hover:text-white',
    );
  }
}
