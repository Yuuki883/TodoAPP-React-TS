// src/components/TodoList.tsx
import React from 'react';
import { TodoItemType, TodoStatus } from '../types';
import { TodoItem } from './TodoItem';

type TodoListProps = {
  todos: TodoItemType[];
  // 編集時
  onEdit: (id: string, title: string, detail: string, dueDate?: string) => void;
  // ステータス変更時
  onStatusChange: (id: string, newStatus: TodoStatus) => void;
  onDelete: (id: string) => void;
};

export const TodoList: React.FC<TodoListProps> = ({
  todos,
  onEdit,
  onStatusChange,
  onDelete,
}) => {
  return (
    <div>
      {todos.length === 0 && <p>TODOリストが空です。</p>}
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onEdit={onEdit}
          onStatusChange={onStatusChange}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};
