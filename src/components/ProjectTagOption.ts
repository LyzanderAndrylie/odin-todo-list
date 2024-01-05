import { Project } from '@/models';
import { htmlToElement } from '@/utils/converter';
import MyElement from './MyElement';

export default class ProjectTagOption implements MyElement {
  private project: Project;

  constructor(project: Project) {
    this.project = project;
  }

  toElement(): Element {
    const htmlString = `<option value="${this.project.uuid}">${this.project.name}</option>`;
    const elements = htmlToElement(htmlString);
    return elements;
  }
}
