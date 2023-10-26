import React from 'react'
import {useLocation} from 'react-router-dom';

const Register = () => {
    const location = useLocation();
  return (
    <div>
        {location.userType}
    </div>
  )
}
export default Register
