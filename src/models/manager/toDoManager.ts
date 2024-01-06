import { Project } from '../project';
import { Task } from '../task';

export default interface ToDoManager {
  defaultProject: Project;
  projects: Map<string, Project>;
  tasks: Map<string, Task>

  createProject(name: string): Project;
  findProject(uuid: string): Project;
  findAllProject(): Project[];
  findAllProjectTag(): string[];

  createTaskToProject(dto: Omit<Task, 'uuid'>, projectUUID: string): Task;
  findTask(uuid: string): Task;
  findAllTask(): Task[];
  findAllTaskInProject(projectUUID: string): Task[];

  findAllTaskToday(): Task[];
  findAllTaskUpcoming(): Task[];
  findAllArchivedTask(): Task[];

  setCompletedForTask(
    uuid: string,
    completed: boolean,
  ): void;
  setArchivedForTask(
    uuid: string,
    archived: boolean,
  ): void;
}
