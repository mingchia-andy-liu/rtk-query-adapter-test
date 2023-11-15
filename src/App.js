import {useState} from 'react';
import { selectTodoById, selectAllTodos, useGetTodoQuery } from "./features/todoSlice";

const Item = ({ id }) => {
  // Do not know the pagination parameters. ie sorting/pageSize/page number/query options. Passing undefined will act as a new query and not retrieve 
  const { itemById } = useGetTodoQuery(undefined, {
    selectFromResult: ({data}) => ({
      itemById: data && selectTodoById(data, id)
    })
  });
  return <div>list: {itemById?.item}</div>
}

function App() {
  const [page, setPage] = useState(1);
  // data of { count: number, data: T[] }
  const { data, isLoading } = useGetTodoQuery(page);
  if (isLoading) { return <div>is loading...</div> }
  
  const todos = selectAllTodos(data);
  return (
    <div>
      <button onClick={() => setPage((prePage) => prePage + 1)}>next page</button>
      {todos.map((t) => {
        return <Item key={t.id} id={t.id} />
      })}
    </div>
  );
}

export default App;
