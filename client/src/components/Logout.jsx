import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { Consumer } from '../store-token/UseAuth';

function Logout() {
   const {LogoutUser}=Consumer(); 
    useEffect(()=>{
     LogoutUser();
    },[LogoutUser])
  return <Navigate to='/login' />;
}

export default Logout;
