export type Task = {
  id: number;
  title: string;
  description: string;
  dueDate: Date;
  priority: 'Low' | 'Medium' | 'High';
  completed: boolean;
  archived: boolean;
  projectTag: string;
};
