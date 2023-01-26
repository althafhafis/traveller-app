import React from 'react'
import { Route, Navigate, useLocation,} from 'react-router-dom'

function PrivateRoute({ component: Component, ...rest }) {
    const user_data = JSON.parse(localStorage.getItem("user_data"));
    const location = useLocation();
    return (
    <Route 
        {...rest} 
        render={(props) => {
            if (user_data?.access) {
                return <Component {...props} />
            } else {
                return (
                    <Navigate  
                        to={{ 
                            pathname: "/auth/login/",
                            search: `?next=${location.pathname}`
                        }} 
                    />
                )
            }
        }} 
    />
  );
}

export default PrivateRoute