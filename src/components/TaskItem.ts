import { Task } from '@/models/task';
import { htmlToElement } from '@/utils/converter';
import MyElement from './MyElement';

export default class TaskItem implements MyElement {
  task: Task;

  constructor(task: Task) {
    this.task = task;
  }

  toElement(): Element {
    const priorityColorList = {
      Low: 'bg-green-600',
      Medium: 'bg-amber-500',
      High: 'bg-red-600',
    };
    const priorityColor = priorityColorList[this.task.priority];

    const htmlString = `
    <div data-uuid="${
      this.task.uuid
    }" class="mb-4 grid grid-cols-[40px_1fr_auto] grid-rows-[repeat(2,1fr)] gap-1 rounded-xl border border-tussock-400 bg-tussock-50 p-2 hover:bg-tussock-400 hover:text-white">
      <div class="row-span-2 self-center justify-self-center">
        <input type="checkbox" data-uuid="${
          this.task.uuid
        }" class="h-7 w-7 accent-emerald-600" ${
          this.task.completed ? 'checked' : ''
        }>
      </div>
      <div class="self-center justify-items-center">${this.task.title}</div>
      <div class="w-24 self-center justify-self-end rounded-xl ${priorityColor} text-center text-sm text-white">
        ${this.task.priority}
      </div>
      <div class="text-sm">${this.task.dueDate}</div>
      <div class="text-sm"># ${this.task.projectTag}</div>
    </div>
    `;
    const element = htmlToElement(htmlString);
    return element;
  }
}
