import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import RegisterPage from "./components/Register";
import LoginPage from "./components/Login";
import AccessDeniedPage from "./components/NotFound";
import Dashboard from "./components/Dashboard";

function App() {
  

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<AccessDeniedPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
