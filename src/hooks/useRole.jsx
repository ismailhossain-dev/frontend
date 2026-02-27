import React from "react";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
//Role Work just database teke role ta niye aste email er mardome
const useRole = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: role, isLoading: isRoleLoading } = useQuery({
    enabled: !!user?.email,
    queryKey: ["role", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure(`/user/role/${user?.email}`);
      console.log(data);
      return data.role;
    },
  });

  return [role, isRoleLoading];
};

export default useRole;
