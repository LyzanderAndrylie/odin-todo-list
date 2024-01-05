import { htmlToElement } from '@/utils/converter';
import MyElement from './MyElement';

export default class AddProjectInput implements MyElement {
  toElement(): Element {
    const htmlString = `
    <form class="" method="post">
      <div class="flex">
        <input type="text" class="w-full rounded-l-xl border border-slate-200 bg-slate-50 p-1" placeholder="New Project Name">
        <button type="submit" class="bg-emerald-600 p-1 hover:bg-emerald-700">
          <svg class="h-6 w-6 fill-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <title>add</title>
            <path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z"></path>
          </svg>
        </button>
        <button type="button" class="rounded-r-xl bg-red-600 p-1 hover:bg-red-700">
          <svg class="h-6 w-6 fill-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <title>delete</title>
            <path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z"></path>
          </svg>
        </button>
      </div>
    </form>
    `;
    const element = htmlToElement(htmlString);
    return element;
  }
}
