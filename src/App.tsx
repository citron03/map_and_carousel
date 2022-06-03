import { useState } from 'react';
import './App.css';
import { Map, Carousel } from "./components";

function App() {

  const [data, setDate] = useState([]);

  return (
    <div className="App">
      <Carousel/>
      <Map/>
    </div>
  );
}

export default App;
