import { Project } from '../project';
import { Task } from '../task';

export default interface ToDoManager {
  projects: Project[];
  tasks: Task[]

  createProject(name: string): Project;
  findProject(id: number): Project;
  findAllProject(): Project[];
  findAllProjectTag(): string[];

  createTaskToProject(dto: Omit<Task, 'id'>, projectId: number): Task;
  findTask(id: number): Task;
  findAllTask(): Task[];
  findAllTaskInProject(projectId: number): Task[];

  setCompletedForTask(
    id: number,
    completed: boolean,
  ): void;
  setArchivedForTask(
    id: number,
    completed: boolean,
  ): void;
}
