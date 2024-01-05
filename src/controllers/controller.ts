import { Task } from '@/models/task';

export default interface Controller {
  addProject(name: string): void;
  addTaskToProject(dto: Omit<Task, 'id'>, projectId: number): void;
  setCompletedForTask(id: number, completed: boolean): void;
  setArchivedForTask(id: number, archived: boolean): void;
}
