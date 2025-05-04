export enum Role {
  ADMIN = "ADMIN",
  EMPLOYEE = "EMPLOYEE",
}

export type userRole = Role.ADMIN | Role.EMPLOYEE;

// Define role-based permissions
export const rolePermissions = {
  [Role.ADMIN]: {
    canDelete: true,
    canEdit: true,
    canView: true,
  },
  [Role.EMPLOYEE]: {
    canDelete: false,
    canEdit: false,
    canView: true,
  },
};

// Helper function to check if a user has a specific permission
export const hasPermission = (
  role: userRole,
  permission: keyof (typeof rolePermissions)[Role.ADMIN]
): boolean => {
  return rolePermissions[role]?.[permission] || false;
};

// Function to get role from JWT token
export const getRoleFromToken = (token: string): userRole | null => {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    const { role } = JSON.parse(jsonPayload);
    return role as userRole;
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};
