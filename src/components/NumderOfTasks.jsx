import React from 'react'
import { useGetTodosQuery } from '../redux/api';

const NumberOfTasks = () => {

   const { data: todos, isLoading } = useGetTodosQuery();
  const completedTasks = todos?.filter((todo) => todo.isDone).length;
  const incompletedTasks = todos?.filter((todo) => !todo.isDone).length;

  return (
    <div>
      {isLoading ? <p>Загрузка...</p> : 
      <div>
        <p>Все задачи: {todos.length}</p>
        <p>Выполненные задачи: {completedTasks}</p>
        <p>Невыполненные задачи: {incompletedTasks}</p>
      </div> }
    </div>
  )
}

export default NumberOfTasks
