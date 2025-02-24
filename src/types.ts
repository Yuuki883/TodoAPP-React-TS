export type TodoStatus = '未着手' | '進行中' | '完了';

export type TodoItemType = {
  id: string; // uuid など
  title: string;
  detail: string;
  status: TodoStatus;
  dueDate?: string; // 期限
  createdAt: string; // 作成日時 (ISO)
  updatedAt: string; // 更新日時 (ISO)
};
