import { Task } from './task';

export type Project = {
  uuid: string;
  name: string;
  tasks: Task[];
};
