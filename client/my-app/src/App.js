import { gql, useQuery } from '@apollo/client'
import './App.css'

const query = gql`
query GetTodosWithUser{
  getTodos {
    title
    completed
    user {
      name 
      id
    }
   }
 }`


function App() {
  const { data, loading, error } = useQuery(query)
  if (loading) return <h1>Loading...</h1>
  if (!data.getTodos.length) return null
  return (
    <div className="App">
      <h1>Todo List</h1>
      <table>
        <tr>
          <th>Title</th>
          <th>Completed:</th>
          <th>User ID</th>
          <th>User Name</th>
        </tr>
        <tbody>
          {data.getTodos.map((todo) => (
            <tr key={todo.id}>
              <td>{todo.title}</td>
              <td>{todo?.completed ? 'Yes' : 'No'}</td>
              <td>{todo.user?.id || ''}</td>
              <td>{todo.user?.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
