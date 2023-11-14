import { todoAdapter, useGetTodoQuery } from "./features/todoSlice";

const Item = ({ id }) => {
  const { selectById } = todoAdapter.getSelectors(
    /** if i supply the initial state here, selectById will return undefined.
      () => todoAdapter.getInitialState()
    */
  );

  const { listById } = useGetTodoQuery(undefined, {
    selectFromResult: ({ data }) => ({
      // throws an error. 
      listById: data.data && selectById(data.data, id)
    })
  });

  return <div>list: {listById?.item}</div>
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
