// App.jsx
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import BattlePage from "./pages/BattlePage";
import Nav from "./components/Nav";
import Card from "./components/Card";
import PokemonDetail from "./components/PokemonDetail";
import Login from './pages/Login';
import Register from './pages/Register';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/battle" element={<BattlePage />} />
          <Route path="/card" element={<Card />} />
          <Route path="/pokemon/:name" element={<PokemonDetail />} />
          {/* You can add other routes like Login, Users, etc. */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
