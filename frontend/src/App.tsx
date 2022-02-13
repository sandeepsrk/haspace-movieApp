import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Listing from './pages/Listing';
import Form from './pages/Form';
import Navbar from "./components/Navbar";
import React from "react";
import { ReloadContext, Reload } from './context/movieContext';

function App() {
  const [reload, setReload] = React.useState(Reload.reload);

  return (
    <ReloadContext.Provider value={{ reload, setReload }}>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Listing />} />
        <Route path="/form">
          <Route path=":movieId" element={<Form />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </ReloadContext.Provider >
  );
}

export default App;