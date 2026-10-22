export const staffPermissions = {
  viewDashboard: 'DASHBOARD_VIEW',
  viewReports: 'REPORT_VIEW',
  manageRoles: 'ROLE_MANAGE_ROLES',
  managePermissions: 'ROLE_MANAGE_PERMISSIONS',
  viewStaff: 'STAFF_VIEW',
  manageStaffAccounts: 'STAFF_MANAGE',
  viewBookings: 'BOOKING_VIEW',
  createBooking: 'BOOKING_CREATE',
  updateBooking: 'BOOKING_UPDATE',
  cancelBooking: 'BOOKING_CANCEL',
  checkinCheckout: 'GUEST_CHECKIN_OUT',
  viewRooms: 'ROOM_VIEW',
  updateRoomStatus: 'ROOM_STATUS_UPDATE',
  viewHousekeeping: 'HOUSEKEEPING_VIEW',
  assignHousekeeping: 'HOUSEKEEPING_ASSIGN',
  updateHousekeeping: 'HOUSEKEEPING_UPDATE',
  viewMaintenance: 'MAINTENANCE_VIEW',
  createMaintenance: 'MAINTENANCE_CREATE',
  updateMaintenance: 'MAINTENANCE_UPDATE',
};

export function getRoleNames(user) {
  return (user?.roles || []).map((role) => typeof role === 'string' ? role : role?.name).filter(Boolean);
}

export function hasRole(user, roleName) {
  return getRoleNames(user).includes(roleName);
}

export function getPermissionCodes(user) {
  return (user?.roles || []).flatMap((role) => {
    if (typeof role === 'string') return [];
    return (role?.permissions || []).map((permission) => permission?.code).filter(Boolean);
  });
}

export function hasPermission(user, permissionCode) {
  return getPermissionCodes(user).includes(permissionCode);
}
