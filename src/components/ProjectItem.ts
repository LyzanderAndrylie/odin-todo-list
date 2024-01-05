import { htmlToElement } from '@/utils/converter';
import MyElement from './MyElement';

export default class ProjectItem implements MyElement {
  private projectTag: string;

  constructor(projectTag: string) {
    this.projectTag = projectTag;
  }

  toElement(): Element {
    const htmlString = `
    <li class="mb-2 rounded-xl p-2 hover:bg-tussock-500 hover:text-white" data-tag="${this.projectTag}">
    ${this.projectTag}
    </li>
    `;
    const element = htmlToElement(htmlString);
    return element;
  }
}
