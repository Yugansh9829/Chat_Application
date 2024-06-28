import Login from "./components/login";
import Home from "./components/home.js";
import Sign from "./components/sign_up.js";
import Success from "./components/success.js";
import Allusers from "./components/allusers.js"
import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/sign_up" element={<Sign/>}></Route>
          <Route path="/success" element={<Success/>}></Route>
          <Route path="/all_users" element={<Allusers/>}></Route>
        </Routes>
      </BrowserRouter>
    </>

  );
}

export default App;
