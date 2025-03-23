import React from 'react'
import { useGetTodosQuery } from '../redux/api';

const New = () => {

   const { data: todos, isLoading } = useGetTodosQuery();

  return (
    <div>
      {isLoading ? <p>Загрузка...</p> : todos.length}
    </div>
  )
}

export default New
