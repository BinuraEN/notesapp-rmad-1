import { Route, Routes } from "react-router";
import Navigation from "./components/Navigation";
import Create from "./components/pages/Create";
import Home from "./components/pages/Home";
import MyNotes from "./components/pages/MyNotes";

function App() {
  return (
    <div>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/notes" element={<MyNotes />} />
        <Route path="/add-note" element={<Create />} />
      </Routes>
    </div>
  );
}

export default App;
