import { useState } from 'react';
import './App.css';
import { Button, HStack } from '@chakra-ui/react';

const Demo = () => {
  return (
    <HStack>
      <Button>Click me</Button>
      <Button>Click me</Button>
    </HStack>
  );
};

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Demo />
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
      </div>
      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
    </>
  );
}

export default App;
