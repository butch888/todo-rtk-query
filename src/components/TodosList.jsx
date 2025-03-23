import React, { useState } from 'react';
import { useGetTodosQuery, useRemoveTodoMutation, useUpdateTodoMutation } from '../redux/api';
import '../App.css';

const TodoList = () => {
  const { data: todos, isLoading } = useGetTodosQuery();
  const [removeTodo] = useRemoveTodoMutation();
  const [updateTodo] = useUpdateTodoMutation();
  
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState('');

  if (isLoading) return <p>Загрузка...</p>;

  const handleEdit = (todo) => {
    setEditId(todo.id);
    setEditText(todo.task);
  };

  const handleSave = async () => {
    if (editText.trim()) {
      await updateTodo({ id: editId, task: editText });
      setEditId(null); // Выход из режима редактирования
    }
  };

  const handleIsDone = async (todo) => {
    await updateTodo({ id: todo.id, isDone: !todo.isDone });
  };

  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>
          {editId === todo.id ? (
            <>
              <input
                type="text"
                className="add-task-input"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                autoFocus
              />
              <button onClick={handleSave} disabled={!editText.trim() || editText === todo.task}>
                Сохранить
              </button>
              <button onClick={() => setEditId(null)}>Отмена</button>
            </>
          ) : (
            <>
              <span style={{ textDecoration: todo.isDone ? 'line-through' : 'none' }}>
                {todo.task}
              </span>
              <input
                type="checkbox"
                checked={todo.isDone}
                onChange={() => handleIsDone(todo)}
              />
              <button onClick={() => handleEdit(todo)}>✏️</button>
              <button onClick={() => removeTodo(todo.id)}>🗑️</button>
            </>
          )}
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
