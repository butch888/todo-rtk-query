import React, { useState } from 'react';
import { useAddTodoMutation } from '../redux/api';
import { createKey } from '../utilites/uniqueKey';

const AddTodo = () => {
  const [task, setTask] = useState('');
  const [addTodo, { isLoading }] = useAddTodoMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (task) {
      await addTodo({ id: `${createKey()}`, task: task, isDone: false });
      setTask(''); // Очистить поле ввода после добавления
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className='add-task-input'
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Введите название задачи"
        required
        autoFocus
      />
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Добавление...' : 'Добавить задачу'}
      </button>
    </form>
  );
};

export default AddTodo;