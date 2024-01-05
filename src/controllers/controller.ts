import { Project } from '@/models';
import { Task } from '@/models/task';

export default interface Controller {
  addProject(name: string): void;
  addTaskToProject(dto: Omit<Task, 'uuid'>, projectUUID: string): void;
  setCompletedForTask(uuid: string, completed: boolean): void;
  setArchivedForTask(uuid: string, archived: boolean): void;

  findAllProject(): Project[];
  findAllTask(): Task[];
  findAllTaskInProject(projectUUID: string): Task[];
  findProject(projectUUID: string): Project;
  findTask(uuid: string): Task;

  getDefaultProject(): Project;
}
