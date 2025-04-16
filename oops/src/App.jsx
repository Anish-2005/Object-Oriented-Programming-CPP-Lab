// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Labs from './pages/Lab';
import AddLab from './pages/AddLab';
import Compiler from './pages/Complier';
import Learn from './pages/Learn';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/labs" element={<Labs />} />
        <Route path="/add" element={<AddLab />} />
        <Route path="/compile" element={<Compiler />} />
        <Route path="/learn" element={<Learn />} />
      </Routes>
    </Router>
  );
}

export default App;