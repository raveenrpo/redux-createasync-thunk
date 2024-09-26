import "./App.css";
import { Route, Routes } from "react-router-dom";
import Noteview from "./Notecrud/Noteview";
import Noteadd from "./Notecrud/Noteadd";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Noteview />} />
        <Route path="/two" element={<Noteadd />} />
        <Route path="/two/:id" element={<Noteadd />} />
      </Routes>
    </div>
  );
}

export default App;
