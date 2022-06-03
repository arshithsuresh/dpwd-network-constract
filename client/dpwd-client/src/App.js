
import './App.css';

import LandingPage from './views/LandingPage';
import LoginPage from './views/LoginPage';
import PublicOrg from './views/PublicOrg';
import ERR404 from './views/404';

import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<LandingPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="public" element={<PublicOrg />} />
          <Route path="*" element={<ERR404 />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
