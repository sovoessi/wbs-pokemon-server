// App.jsx
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import BattlePage from "./pages/BattlePage";
import Nav from "./components/Nav";
import Card from "./components/Card";
import PokemonDetail from "./components/PokemonDetail";

function App() {
  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/battle" element={<BattlePage />} />
        <Route path="/card" element={<Card />} />
        <Route path="/pokemon/:name" element={<PokemonDetail />} />
        {/* You can add other routes like Login, Users, etc. */}
      </Routes>
    </Router>
  );
}

export default App;
