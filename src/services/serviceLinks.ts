const baseUrl = "http://sabimarket.somee.com";

export const serviceLinks = {
  login: baseUrl + "/api/Authentication/login",
  refresh: baseUrl + "/api/Authentication/refresh-token",
  getGoodboys: (id: string) => baseUrl + `/api/Caretaker/${id}/goodboys`,
  removeChairman: (id: string) =>
    baseUrl + `/api/Chairman/remove-chairman/` + id,
  getAdminDashBoard: (id: string) => baseUrl + `/api/Admin/${id}/dashboard`,
  createChairmain: baseUrl + "/api/Chairman/create-chairman",
  getAllChairmain: baseUrl + "/api/Chairman/chairmen",
  getAllLga: (state: string) =>
    baseUrl + "/api/Chairman/local-governments?state=" + state,
  adminGetRoles: baseUrl + "/api/Admin/getroles",
  createroles: baseUrl + "/api/Admin/create-roles",
  updateChairman: baseUrl + "/api/Chairman/{id}/updatechairman-profile",

  createWaivedProduct: baseUrl + "/api/WaivedMarket/CreateWaivedProducts",
  editWaivedProduct: baseUrl + "/api/WaivedMarket/UpdateWaivedProducts",
  vendorSubscribe: baseUrl + "/api/WaivedMarket/CreateSubscription",
  checkActiveVendorSubcription:
    baseUrl + "/api/WaivedMarket/CheckActiveVendorSubscription",
  getLGAs: baseUrl + "/api/Utility/getall-localgovernments",
  vendorSignUp: baseUrl + "/api/Authentication/register",
  changePassword: baseUrl + "/api/Settings/change-password",
  forgotPassword: baseUrl + "/api/Settings/forgot-password",
  resetPassword: baseUrl + "/api/Settings/reset-password",
  verifyOtp: baseUrl + "/api/Settings/verify-otp",
  //customers
  customerSignUp: baseUrl + "/api/Authentication/register",
  getWaivedProducts: baseUrl + "/api/WaivedMarket/GetWaivedProducts",
  getWaivedProductById: baseUrl + "/api/WaivedMarket/GetWaivedProductById",

  //admin
  addTeamMate: baseUrl + "/api/Admin/team-members",
  editTeammate: baseUrl + "/api/Admin/team-members",
  getTeamMates: baseUrl + "/api/Admin/team-members",
  getAllSubscriptionPlans:
    baseUrl + "/api/WaivedMarket/GetAllSubscriptionPlans",
  createSubscriptionPlan: baseUrl + "/api/WaivedMarket/CreateSubscriptionPlan",
  updateSubscriptionPlan: baseUrl + "/api/WaivedMarket/UpdateSubscriptionPlan",
  getSubscriptionPlanById:
    baseUrl + "/api/WaivedMarket/GetSubscriptionPlanById",
  getVendorAndProducts: baseUrl + "/api/WaivedMarket/GetVendorAndProducts",
  getCustomerComplaints: baseUrl + "/api/WaivedMarket/GetCustomerComplaints",
  getUrgentPurchaseWaivedProducts:
    baseUrl + "/api/WaivedMarket/GetUrgentPurchaseWaivedProduct",
  blockAndUnblockVendor: baseUrl + "/api/WaivedMarket/BlockOrUnblockVendor",
  getAuditLog: (adminId: string) =>
    baseUrl + `/api/Admin/${adminId}/audit-logs`,
};
