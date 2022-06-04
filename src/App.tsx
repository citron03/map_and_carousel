import './App.css';
import { useState } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Map, Carousel, Navigator } from "./components";

function App() {

  const [data, setData] = useState({});
  
  return (
    <div className="App">
      <BrowserRouter>
        <Navigator/>
        <Routes>
            <Route path="/" element={<Map/>} />
            <Route path="/search" element={<Map search={true} data={data}/>} />
            <Route path="/carousel" element={<Carousel setData={setData}/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
