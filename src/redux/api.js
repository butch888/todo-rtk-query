import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const todosApi = createApi({
  reducerPath: 'todosApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3002' }),
  endpoints: (builder) => ({
    getTodos: builder.query({ // ### Получить все задачи
      query: () => '/todos',
      providesTags: (result) => 
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Todos', id })),
              { type: 'Todos', id: 'LIST' },
            ]
          : [{ type: 'Todos', id: 'LIST' }],
    }),
    addTodo: builder.mutation({ // ### Добавить новую задачу
      query: (newTodo) => ({
        url: '/todos',
        method: 'POST',
        body: newTodo,
      }),
      async onQueryStarted(newTodo, { dispatch, queryFulfilled }) {
        const { data: createdTodo } = await queryFulfilled;
        dispatch(
          todosApi.util.updateQueryData('getTodos', undefined, (draft) => {
            draft.unshift(createdTodo);
          })
        );
      },
    }),
    removeTodo: builder.mutation({ // ### Удалить задачу
      query: (id) => ({
        url: `/todos/${id}`,
        method: 'DELETE',
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          todosApi.util.updateQueryData('getTodos', undefined, (draft) => {
            const index = draft.findIndex((todo) => todo.id === id);
            if (index !== -1) {
              draft.splice(index, 1);
            }
          })
        );
        try {
          await queryFulfilled;
        } catch (error) {
          console.log(error)
          patchResult.undo();
        }
      },
    }),
    updateTodo: builder.mutation({ // ### Редактировать задачу
      query: ({ id, task, isDone }) => ({
        url: `/todos/${id}`,
        method: 'PATCH', // Используем PATCH для частичного обновления при редактировании или изменения статуса
        body: { task, isDone },
      }),
      async onQueryStarted({ id, ...update }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          todosApi.util.updateQueryData('getTodos', undefined, (draft) => {
            const todoToUpdate = draft.find((todo) => todo.id === id);
            if (todoToUpdate) {
              Object.assign(todoToUpdate, update);
            }
          })
        );
        try {
          await queryFulfilled;
        } catch (error) {
          console.log(error)
          patchResult.undo();
        }
      },
    }),
    // другие эндпоинты
  }),
});

export const { 
  useGetTodosQuery, 
  useAddTodoMutation, 
  useRemoveTodoMutation, 
  useUpdateTodoMutation,
  useGetCompletedTasksQuery
} = todosApi;
