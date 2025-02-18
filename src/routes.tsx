import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';    
import App from './pages/App';

const AppRoutes = () => (
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      {/* <Route path="/login" element={<Login />} /> */}
    </Routes>
  </Router>
);

export default AppRoutes;