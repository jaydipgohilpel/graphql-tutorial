import { gql, useQuery } from '@apollo/client'
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
  const { data, loading } = useQuery(query)
  console.log(data);
  if (loading) return <h1>Loading...</h1>
  return (
    <div className="App">
      {/* {JSON.stringify(data.getTodos)} */}
      <h1>Todo List</h1>
      <table>
        <tbody>
          {data.getTodos.map((todo) => (
            <tr key={todo.id}>
              <td>{todo.title}</td>
              <td>Completed: {todo?.completed ? 'Yes' : 'No'}</td>
              <td>User ID: {todo.user?.id || ''}</td>
              <td>User Name: {todo.user?.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
