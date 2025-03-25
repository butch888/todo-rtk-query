import React, { useState } from 'react';
import { useGetTodosQuery, useRemoveTodoMutation, useUpdateTodoMutation } from '../redux/api';
import '../App.css';

const TodoList = () => {
  const { data: todos, isLoading } = useGetTodosQuery();
  const [removeTodo] = useRemoveTodoMutation();
  const [updateTodo] = useUpdateTodoMutation();

  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState('');
  const [filter, setFilter] = useState('all'); // 'all', 'completed', 'active'

  if (isLoading) return <p>Загрузка...</p>;

  const handleEdit = (todo) => {
    setEditId(todo.id);
    setEditText(todo.task);
  };

  const handleSave = async () => {
    if (editText.trim()) {
      await updateTodo({ id: editId, task: editText });
      setEditId(null);
    }
  };

  const handleIsDone = async (todo) => {
    await updateTodo({ id: todo.id, isDone: !todo.isDone });
  };

  const filteredTodos = todos?.filter(todo => {
    if (filter === 'completed') return todo.isDone;
    if (filter === 'active') return !todo.isDone;
    return true;
  });

  return (
    <div>
      <div>
        <label>
          <input
            type="radio"
            name="filter"
            value="all"
            checked={filter === 'all'}
            onChange={() => setFilter('all')}
          /> Все задачи
        </label>
        <label>
          <input
            type="radio"
            name="filter"
            value="completed"
            checked={filter === 'completed'}
            onChange={() => setFilter('completed')}
          /> Выполненные
        </label>
        <label>
          <input
            type="radio"
            name="filter"
            value="active"
            checked={filter === 'active'}
            onChange={() => setFilter('active')}
          /> Активные
        </label>
      </div>
      <ul>
        {filteredTodos.map((todo) => (
          <li key={todo.id} className='list'>
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
                <span>{todo.date}</span>&nbsp;&nbsp;
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
    </div>
  );
};

export default TodoList;
