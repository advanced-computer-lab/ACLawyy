import { render } from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import App from "./App";
import Login from "./Pages/Login"
import Admin from "./Pages/Admin"
const rootElement = document.getElementById("root");
render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="login" element={<Login />} />
      <Route path="admin" element={<Admin />} />
      
    </Routes>
  </BrowserRouter>,
  rootElement
);