import reactLogo from "./assets/react.svg";
import useStore from "./store/test";

const App = () => {
  const { count, inc, dec } = useStore((state) => state);
  // const [count, setCount] = useState(0);
  // const inc = useTest((state: any) => state.inc);
  // const dec = useTest((state: any) => state.dec);
  // const count = useStore((state: any) => state.count);

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <p>{count}</p>
        <button onClick={() => inc()}>Increment</button>
        <button onClick={() => dec()}>Decrement</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  );
};

export default App;
function useTest(arg0: (state: any) => any) {
  throw new Error("Function not implemented.");
}
