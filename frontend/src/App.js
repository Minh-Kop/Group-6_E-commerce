import { Route, Routes } from "react-router-dom";

import Signin from "./screens/Signin";
import Signup from "./screens/Signup";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" index element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
}

export default App;
