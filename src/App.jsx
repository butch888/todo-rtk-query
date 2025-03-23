import AddTodo from './components/AddTodo'
import NumberOfTasks from './components/NumderOfTasks'
import TodoList from './components/TodosList'

const App = () => {
  
  return (
    <div>
      <h1>Todo List</h1>
      <NumberOfTasks/>
      
      <AddTodo/>
      <TodoList />
    </div>
  )
}

export default App
