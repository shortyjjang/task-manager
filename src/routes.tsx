import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import LayoutProvier from "./context/LayoutProvier";
import ErrorBoundary from "./context/ErrorBoundary";
import Login from "./pages/Login";
import Project from "./pages/Project";
const AppRoutes = () => (
  <Router>
    <LayoutProvier>
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/project/:id" element={<Project />} />
        </Routes>
      </ErrorBoundary>
    </LayoutProvier>
  </Router>
);

export default AppRoutes;
