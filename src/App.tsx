import Button from "@mui/material/Button";

import useStore from "./store/test";

const App = () => {
  const { count, inc, dec } = useStore((state) => state);

  // const [count, setCount] = useState(0);
  // const inc = useTest((state: any) => state.inc);
  // const dec = useTest((state: any) => state.dec);
  // const count = useStore((state: any) => state.count);

  return (
    <div className="App">
      <p style={{ color: "black" }}>{count}</p>
      <Button onClick={() => inc()}>Increment</Button>
      <Button onClick={() => dec()}>Decrement</Button>
    </div>
  );
};

export default App;
