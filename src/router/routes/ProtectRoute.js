import React, { Suspense } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import getLoginPath from '../../utils/getLoginPath';

const ProtectRoute = ({ route, children }) => {
  const { userInfo, loader } = useSelector(state => state.auth);


  if (loader) {
    return <div>Loading...</div>;
  }


  if (!userInfo) {
    return <Navigate to={getLoginPath()} replace />;
  }

 
  if (userInfo.role !== route.role) {
    return <Navigate to="/unauthorized" replace />;
  }

  
  return (
    <Suspense fallback={<div>Loading...</div>}>
      {children}
    </Suspense>
  );
};

export default ProtectRoute;