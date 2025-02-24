// src/components/TodoForm.tsx
import React, { useState, FormEvent } from 'react';
import { TextField, Button } from '@mui/material';

type TodoFormProps = {
  onAddTodo: (title: string, detail: string, dueDate?: string) => void;
};

export const TodoForm: React.FC<TodoFormProps> = ({ onAddTodo }) => {
  const [title, setTitle] = useState('');
  const [detail, setDetail] = useState('');
  const [dueDate, setDueDate] = useState('');

  // フォーム送信時のイベントハンドラ
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title) return;
    onAddTodo(title, detail, dueDate || undefined);

    // フォーム初期化
    setTitle('');
    setDetail('');
    setDueDate('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}
    >
      <TextField
        label="タイトル"
        variant="outlined"
        size="small"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <TextField
        label="詳細"
        variant="outlined"
        size="small"
        value={detail}
        onChange={(e) => setDetail(e.target.value)}
      />
      <TextField
        label="期限"
        type="date"
        size="small"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        InputLabelProps={{ shrink: true }}
      />
      <Button type="submit" variant="contained" color="primary" size="small">
        追加
      </Button>
    </form>
  );
};
