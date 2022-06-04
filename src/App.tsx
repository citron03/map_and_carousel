import './App.css';
import { useState } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Map, SearchCarousel, Navigator, Footer } from "./components";

function App() {

  const [data, setData] = useState({});
  
  return (
    <div className="App">
      <BrowserRouter>
        <Navigator/>
        <Routes>
            <Route path="/" element={<Map/>} />
            <Route path="/search" element={<Map search={true} data={data}/>} />
            <Route path="/carousel" element={<SearchCarousel setData={setData}/>} />
        </Routes>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
