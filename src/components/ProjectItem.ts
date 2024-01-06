import { Project } from '@/models';
import { htmlToElement } from '@/utils/converter';
import MyElement from './MyElement';

export default class ProjectItem implements MyElement {
  private project: Project;

  constructor(project: Project) {
    this.project = project;
  }

  toElement(): Element {
    const htmlString = `
    <li class="mb-2 rounded-xl p-2 hover:bg-tussock-500 active:bg-tussock-600 hover:text-white" data-uuid="${this.project.uuid}">
    ${this.project.name}
    </li>
    `;
    const element = htmlToElement(htmlString);
    return element;
  }
}
