export type TaskPriority = 'Low' | 'Medium' | 'High';

export type Task = {
  uuid: string;
  title: string;
  description: string;
  dueDate: Date;
  priority: TaskPriority;
  completed: boolean;
  archived: boolean;
  projectTag: string;
};
