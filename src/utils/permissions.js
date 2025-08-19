// src/utils/permissions.js
export const hasPermission = (user, requiredPermission) => {
  if (!user || !user.role) return false;

  const rolePermissions = {
    admin: ["manage_users", "manage_content", "view_reports"],
    parent: ["manage_children", "view_progress", "make_payments"],
    child: ["access_games", "complete_activities"],
    tutor: ["view_schedule", "manage_sessions"],
  };

  return rolePermissions[user.role]?.includes(requiredPermission) || false;
};

export const canAccessRoute = (user, routePermissions) => {
  if (!routePermissions || routePermissions.length === 0) return true;
  if (!user) return false;

  return routePermissions.some((permission) => hasPermission(user, permission));
};
