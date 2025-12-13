import React from 'react';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useUserInfo = () => {
   const {user} = useAuth()
   const axiosSecure = useAxiosSecure()


   const {data:userInfo={},isLoading}= useQuery({
    queryKey:['userInfo',user?.email],
    enabled:!!user?.email,
    queryFn:async ()=>{
        const res = await axiosSecure.get(`/users/${user.email}`)
        return res.data
    }
   })
   return {userInfo,isLoading}
};

export default useUserInfo;