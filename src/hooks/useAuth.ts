import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import {
  Role,
  getRoleFromToken,
  hasPermission,
  rolePermissions,
} from "@/utils/auth";

export const useAuth = () => {
  const [userRole, setUserRole] = useState<Role | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      const role = getRoleFromToken(token);
      setUserRole(role);
    }
    setIsLoading(false);
  }, []);

  const checkPermission = (
    permission: keyof (typeof rolePermissions)[Role.ADMIN]
  ) => {
    if (!userRole) return false;
    return hasPermission(userRole, permission);
  };

  const isAdmin = () => userRole === Role.ADMIN;
  const isEmployee = () => userRole === Role.EMPLOYEE;

  return {
    userRole,
    isLoading,
    checkPermission,
    isAdmin,
    isEmployee,
  };
};
