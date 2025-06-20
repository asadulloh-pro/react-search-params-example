import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
// import useAppSearchParams from './_utils/useAppSearchparams';

function App() {
  const [count, setCount] = useState(0);
  // const { set, setGroup, get, setWithDebounce,setGroupWithDebounce } = useAppSearchParams();
  // set("filter", "something");
  // setWithDebounce("filter", "something", 500)
  // setGroup(['filter', 'page'], ['something', 1]);
  // setGroupWithDebounce(['filter', 'page'], ['something', 1], 500);
  // get(["filter", "page"])
  // get("page")

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
