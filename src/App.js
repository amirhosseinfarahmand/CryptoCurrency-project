import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import CoinPage from "./pages/CoinPage";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/coins/:id" element={<CoinPage />} />
      </Routes>
    </Router>
  );
}

export default App;
