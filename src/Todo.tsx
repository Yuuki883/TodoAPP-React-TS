import React, { useState, useEffect, ChangeEvent } from 'react';
import { TodoForm } from './components/TodoForm';
import { TodoList } from './components/TodoList';
import { TodoItemType, TodoStatus } from './types';
import { v4 as uuidv4 } from 'uuid';
import { Select, MenuItem, TextField } from '@mui/material';

export const Todo: React.FC = () => {
  //Todoリストのstate (既存)
  const [todos, setTodos] = useState<TodoItemType[]>([]);

  //絞り込み用のstate (既存)
  const [filterText, setFilterText] = useState<string>('');
  const [filterStatus, setFilterStatus] = useState<TodoStatus | 'all'>('all');

  //ソート用のstate (既存)
  const [sortKey, setSortKey] = useState<'id' | 'dueDate'>('id');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  //初回マウント時、localStorageから読み込む
  useEffect(() => {
    const stored = localStorage.getItem('todos');
    if (stored) {
      setTodos(JSON.parse(stored));
    }
  }, []);

  //todos が更新されるたびにlocalStorageへ保存
  useEffect(() => {
    console.log('Updated todos state:', todos);
    localStorage.setItem('todos', JSON.stringify(todos));
    console.log('LocalStorage after set:', localStorage.getItem('todos'));
  }, [todos]);

  //Todoを追加 (既存)
  const handleAddTodo = (title: string, detail: string, dueDate?: string) => {
    const now = new Date().toISOString();
    const newTodo: TodoItemType = {
      id: uuidv4(),
      title,
      detail,
      status: '未着手',
      dueDate,
      createdAt: now,
      updatedAt: now,
    };
    setTodos((prev) => [...prev, newTodo]);
  };

  //Todoを編集 (既存)
  const handleEditTodo = (
    id: string,
    title: string,
    detail: string,
    dueDate?: string
  ) => {
    const now = new Date().toISOString();
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id
          ? { ...todo, title, detail, dueDate, updatedAt: now }
          : todo
      )
    );
  };

  //ステータス変更 (既存)
  const handleStatusChange = (id: string, newStatus: TodoStatus) => {
    const now = new Date().toISOString();
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, status: newStatus, updatedAt: now } : todo
      )
    );
  };

  //削除 (既存)
  const handleDeleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  //絞り込み (既存)
  const filteredTodos = todos.filter((todo) => {
    // filterText が ID or タイトル or 期限に部分一致
    const matchText =
      todo.id.includes(filterText) ||
      todo.title.includes(filterText) ||
      (todo.dueDate && todo.dueDate.includes(filterText));

    //ステータス
    const matchStatus =
      filterStatus === 'all' ? true : todo.status === filterStatus;

    return matchText && matchStatus;
  });

  //ソート (既存)
  const sortedTodos = [...filteredTodos].sort((a, b) => {
    let compareResult = 0;
    if (sortKey === 'id') {
      compareResult = a.id.localeCompare(b.id);
    } else if (sortKey === 'dueDate') {
      if (!a.dueDate && b.dueDate) return 1;
      if (a.dueDate && !b.dueDate) return -1;
      if (a.dueDate && b.dueDate) {
        compareResult = a.dueDate.localeCompare(b.dueDate);
      }
    }
    return sortOrder === 'asc' ? compareResult : -compareResult;
  });

  return (
    <div style={{ padding: '1rem' }}>
      <h1>TODO管理</h1>

      {/* TodoForm */}
      <TodoForm onAddTodo={handleAddTodo} />

      {/* 絞り込み＆ソート */}
      <div style={{ margin: '1rem 0', display: 'flex', gap: '1rem' }}>
        <TextField
          label="ID.タイトル.期限"
          variant="outlined"
          size="small"
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
        />

        <Select
          value={filterStatus}
          onChange={(e) =>
            setFilterStatus(e.target.value as TodoStatus | 'all')
          }
          size="small"
        >
          <MenuItem value="all">全て</MenuItem>
          <MenuItem value="未着手">未着手</MenuItem>
          <MenuItem value="進行中">進行中</MenuItem>
          <MenuItem value="完了">完了</MenuItem>
        </Select>

        <Select
          value={sortKey}
          onChange={(e) => setSortKey(e.target.value as 'id' | 'dueDate')}
          size="small"
        >
          <MenuItem value="id">ID</MenuItem>
          <MenuItem value="dueDate">期限</MenuItem>
        </Select>

        <Select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
          size="small"
        >
          <MenuItem value="asc">昇順</MenuItem>
          <MenuItem value="desc">降順</MenuItem>
        </Select>
      </div>

      {/* TodoList */}
      <TodoList
        todos={sortedTodos}
        onEdit={handleEditTodo}
        onStatusChange={handleStatusChange}
        onDelete={handleDeleteTodo}
      />
    </div>
  );
};

export default Todo;
