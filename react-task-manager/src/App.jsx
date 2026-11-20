import{ Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import List from "./pages/List";
import Detail from "./pages/Detail";
import "./App.css";

function App() {
  return (<>

  <Navbar/>
  <Routes>

  <Route path="/" element={<Home/>}/>
  <Route path="/products" element={<List/>}/>
  <Route path="/products/:id" element={<Detail/>}/>
  <Route path="*" element={<h1 className="not-found">404-page Not Found</h1>}/>

  </Routes>
  
</>);
}
export default App;