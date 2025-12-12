import React from 'react';
import useAuth from '../hooks/useAuth';
import useRole from '../hooks/useRole';
import ForbiddenPage from '../pages/ForbiddenPage/ForbiddenPage';
import LoadingPage from '../pages/LoadingPage/LoadingPage';


const EmployeeRoute = ({children}) => {
    
    const {loading} = useAuth()
    const {role,roleLoading} = useRole()

    if(loading || roleLoading){
        return <LoadingPage/>
    }

    if(role !== 'employee'){
        return <ForbiddenPage/>
    }
    return children
};

export default EmployeeRoute;