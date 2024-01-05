import { Task } from './task';

export type Project = {
  id: number;
  name: string;
  tasks: Task[];
};

