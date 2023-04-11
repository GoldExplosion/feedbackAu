import "./App.css";
import Form from "./Components/Form";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Food from "./Components/Food";
import Security from "./Components/Security";
import Error from "./Components/Error";
import Thankyou from "./Components/Thankyou";
import HouseKeeping from "./Components/HouseKeeping";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/housekeeping" element={<Form />} />
          <Route path="/food" element={<Food/>}/>
          <Route path="/security" element={<Security/>}/>
          <Route path="/error" element={<Error/>}/>
          <Route path="/thankyou" element={<Thankyou/>}/>
          {/* <Route path="/toilet" element={<Toilet/>}/> */}
          <Route path="/toilet" element={<HouseKeeping/>}/>

          {/* <Form /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
