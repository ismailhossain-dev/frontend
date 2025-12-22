import React from 'react';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from "@tanstack/react-query";
//Role Work
const useRole = () => {
    const {user} = useAuth()
    const axiosSecure = useAxiosSecure()
    
    //useQuery ase holo Tanstack teke 
    //!! mening hobe consele e boolean value bose jabe 
    
  const { data: role, isLoading: isRoleLoading } = useQuery({
    enabled:  !!user?.email,
    queryKey: ['role', user?.email],
    queryFn: async () => {
       const {data} = await axiosSecure(`/user/role/${user?.email}`)
      console.log(data)
      return data.role
    },
  })

    return [role, isRoleLoading]

};

export default useRole;