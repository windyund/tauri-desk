import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CoverPage from './components/CoverPage';
import MenuPage from './components/MenuPage';
import Page1 from './components/Page1';
import Page2 from './components/Page2';
import Page3 from './components/Page3';

import "./App.css";

function App() {

    return (
        <Router>
            <Routes>
                <Route path="/" element={<CoverPage />} />
                <Route path="/menu/*" element={<MenuPage />} />
                <Route path="/page1/*" element={<Page1 />} />
                <Route path="/page2/*" element={<Page2 />} />
                <Route path="/page3/*" element={<Page3 />} />
            </Routes>
        </Router>
    );
}

export default App;

