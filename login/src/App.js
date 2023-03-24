import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './Dashboard';
import LoginPage from './LoginPage';
import ForgotPassword from './ForgotPassword';
import { Cookies } from 'react-cookie';

const cookies = new Cookies();

function App() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/ForgotPassword" element={<ForgotPassword />} />
        </Routes>
      </BrowserRouter>
    );
  }

export default App;