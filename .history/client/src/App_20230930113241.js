import {
  Route,
  Routes,
} from "react-router-dom";

import DashboardDonor from './components/dash/DashboardDonor';
import Home from "./Home";
import Login from "./components/authentication/Login";
import Marketplace from "./components/market/marketplace";
import Signup from "./components/authentication/Signup";

export default function App() {
  return (
        <Routes>
            <Route  exact path='/' element={<Home/>} />
            <Route  exact path='/signup' element={<Signup/>} />
            <Route  exact path='/login' element={<Login/>} />
            <Route exact path='/dashboard' element={<DashboardDonor/>} />
            <Route exact path='/marketplace' element={<Marketplace/>} />
        </Routes>
  )
}