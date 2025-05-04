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

// Define role-based API endpoints
export const roleBasedEndpoints = {
  [Role.ADMIN]: {
    // Auth Access
    auth: ["/auth/change-password"],
    // User Management
    user: [
      "/user",
      "/user/profile",
      "/user/staff",
      "/user/:id",
      "/user/manage-profile/:id",
    ],
    // Staff Management
    staff: ["/user/staff"],
    // Patient Management
    patient: [
      "/patient/manage",
      "/patient/manage/:id",
      "/patient/manage/:id/delete",
    ],
    // Patient Care Report Management
    pcr: ["/patient-care-report/manage", "/patient-care-report/manage/:id"],
    // Run Report Management
    runReport: ["/run-report/manage", "/run-report/manage/:id"],
  },
  [Role.EMPLOYEE]: {
    // Auth Access
    auth: ["/auth/change-password"],
    // User Access
    user: ["/user/profile", "/user/:id"],
    // Patient Access
    patient: ["/patient", "/patient/:id"],
    // Patient Care Report Access
    pcr: [
      "/patient-care-report",
      "/patient-care-report/:id",
      "/patient-care-report/treatment/:id",
      "/patient-care-report/allergy/:id",
      "/patient-care-report/medical-condition/:id",
    ],
    // Run Report Access
    runReport: ["/run-report", "/run-report/:id"],
    // Profile Access
    profile: ["/profile", "/profile/:id"],
  },
  // Public endpoints (accessible to all authenticated users)
  public: [
    "/auth/login",
    "/auth/signup",
    "/auth/refresh",
    "/auth/logout",
    "/auth/google/login",
    "/auth/google/callback",
    "/auth/microsoft/login",
    "/auth/microsoft/callback",
    "/auth/send-verification-email",
    "/auth/forget-password",
    "/auth/validate-otpCode",
  ],
};

// Helper function to check if a user has a specific permission
export const hasPermission = (
  role: userRole,
  permission: keyof (typeof rolePermissions)[Role.ADMIN]
): boolean => {
  return rolePermissions[role]?.[permission] || false;
};

// Helper function to check if a user can access a specific endpoint
// export const canAccessEndpoint = (
//   role: userRole,
//   endpoint: string
// ): boolean => {
//   // Check public endpoints first
//   if (
//     roleBasedEndpoints.public.some((publicEndpoint) =>
//       endpoint.startsWith(publicEndpoint)
//     )
//   ) {
//     return true;
//   }

//   // If user is ADMIN, they can access everything
//   if (role === Role.ADMIN) {
//     return true;
//   }

//   // For EMPLOYEE, check their specific endpoints
//   const employeeEndpoints = roleBasedEndpoints[Role.EMPLOYEE];
//   if (!employeeEndpoints) return false;

//   // Check if endpoint matches any of the employee's allowed patterns
//   return Object.values(employeeEndpoints).some((endpointGroup) =>
//     endpointGroup.some((allowedEndpoint) => {
//       // Convert endpoint pattern to regex to handle dynamic parameters
//       const pattern = allowedEndpoint.replace(/:id/g, "[^/]+");
//       const regex = new RegExp(`^${pattern}$`);
//       return regex.test(endpoint);
//     })
//   );
// };

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
