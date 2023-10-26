import {
  Route,
  Routes,
} from "react-router-dom";

import DashboardDonee from './components/dash/DashboardDonee';
import DashboardDonor from './components/dash/DashboardDonor';
import Home from "./Home";
import Login from "./components/authentication/Login";
import Marketplace from "./components/market/marketplace";
import Signup from "./components/authentication/Signup";

export default function App() {
  const userType = localStorage.getItem('userType');
  return (
        <Routes>
            <Route  exact path='/' element={<Home/>} />
            <Route  exact path='/signup' element={<Signup/>} />
            <Route  exact path='/login' element={<Login/>} />
            {userType === 'donor' ? (
              <Route exact path='/dashboard' element={<DashboardDonor />} />
            ) : (
              <Route exact path='/dashboard' element={<DashboardDonee />} />
            )}
            <Route exact path='/marketplace' element={<Marketplace/>} />
        </Routes>
  )
}