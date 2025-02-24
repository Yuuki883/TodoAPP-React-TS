// src/components/TodoItem.tsx
import React, { useState } from 'react';
import { TodoItemType, TodoStatus } from '../types';
import { Button, TextField } from '@mui/material';
import { formatDateJST } from '../formatDate'; // 日付フォーマット関数

type TodoItemProps = {
  todo: TodoItemType;
  onEdit: (id: string, title: string, detail: string, dueDate?: string) => void;
  onStatusChange: (id: string, newStatus: TodoStatus) => void;
  onDelete: (id: string) => void;
};

export const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  onEdit,
  onStatusChange,
  onDelete,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editDetail, setEditDetail] = useState(todo.detail);
  const [editDueDate, setEditDueDate] = useState(todo.dueDate || '');

  const handleSave = () => {
    onEdit(todo.id, editTitle, editDetail, editDueDate || undefined);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditTitle(todo.title);
    setEditDetail(todo.detail);
    setEditDueDate(todo.dueDate || '');
    setIsEditing(false);
  };

  // ステータス変更
  const handleStatusClick = () => {
    if (todo.status === '未着手') {
      onStatusChange(todo.id, '進行中');
    } else if (todo.status === '進行中') {
      onStatusChange(todo.id, '完了');
    } else if (todo.status === '完了') {
    }
  };

  return (
    <div
      style={{
        border: '1px solid #ccc',
        padding: '0.5rem',
        marginBottom: '0.5rem',
      }}
    >
      {isEditing ? (
        <div>
          <TextField
            label="タイトル"
            variant="outlined"
            size="small"
            fullWidth
            margin="normal"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
          />
          <TextField
            label="詳細"
            variant="outlined"
            size="small"
            fullWidth
            margin="normal"
            value={editDetail}
            onChange={(e) => setEditDetail(e.target.value)}
          />
          <TextField
            label="期限"
            type="date"
            size="small"
            margin="normal"
            value={editDueDate}
            onChange={(e) => setEditDueDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />

          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={handleSave}
          >
            保存
          </Button>
          <Button
            variant="outlined"
            size="small"
            onClick={handleCancel}
            style={{ marginLeft: '0.5rem' }}
          >
            キャンセル
          </Button>
        </div>
      ) : (
        <div>
          <p>ID: {todo.id}</p>
          <p>タイトル: {todo.title}</p>
          <p>詳細: {todo.detail}</p>
          <p>期限: {todo.dueDate || '未設定'}</p>
          <p>作成日: {formatDateJST(todo.createdAt)}</p>
          <p>更新日: {formatDateJST(todo.updatedAt)}</p>
          <p>ステータス: {todo.status}</p>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {/* ステータスが完了の場合、編集ボタン非表示 */}
            {todo.status !== '完了' && (
              <Button
                variant="outlined"
                color="secondary"
                size="small"
                onClick={() => setIsEditing(true)}
              >
                編集
              </Button>
            )}

            {/* ステータス変更ボタン */}
            {todo.status === '未着手' && (
              <Button
                variant="contained"
                size="small"
                onClick={handleStatusClick}
              >
                進行中へ
              </Button>
            )}
            {todo.status === '進行中' && (
              <Button
                variant="contained"
                size="small"
                onClick={handleStatusClick}
              >
                完了へ
              </Button>
            )}
            {todo.status === '完了' && (
              <Button variant="contained" size="small" disabled>
                完了済
              </Button>
            )}
            <Button
              variant="outlined"
              color="error"
              size="small"
              onClick={() => onDelete(todo.id)}
            >
              削除
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
