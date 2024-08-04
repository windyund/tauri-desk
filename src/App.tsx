import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CoverPage from './components/CoverPage';
import MenuPage from './components/MenuPage';


import "./App.css";

function App() {

    return (
        <Router>
            <Routes>
                <Route path="/" element={<CoverPage />} />
                <Route path="/menu/*" element={<MenuPage />} />
            </Routes>
        </Router>
    );
}

export default App;

