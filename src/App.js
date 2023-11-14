import { todoAdapter, useGetTodoQuery } from "./features/todoSlice";

const Item = ({ id }) => {
  // "unglobalized" set of selectors
  const { selectById } = todoAdapter.getSelectors();

  const { itemById } = useGetTodoQuery(undefined, {
    selectFromResult: ({ data }) => ({
      // Passing same "state" as the one that was set. Throws an error. 
      itemById: data.data && selectById(data.data, id)
    })
  });

  return <div>list: {itemById?.item}</div>
}

function App() {
  // data of { count: number, data: T[] }
  const { data, isLoading } = useGetTodoQuery(/** pagination args */);

  if (isLoading) { return <div>is loading...</div> }

  return (
    <div>
      {data?.data && data?.data.map((i) => {
        return <Item key={i.id} id={i.id} />
      })}
    </div>
  );
}

export default App;
