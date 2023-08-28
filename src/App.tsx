import "./App.css";
import "@fontsource/prompt/100.css";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Restaurants from "./scenes/Restaurants";
import UpdateRestuarant from "./scenes/UpdateRestuarant";
import AddRestaurants from "./scenes/AddRestaurants";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Restaurants />} />
        <Route path="/updateRestuarant/:id" element={<UpdateRestuarant />} />
        <Route path="/AddRestaurants" element={<AddRestaurants />} />
      </Route>
    </Routes>
  );
}

export default App;
