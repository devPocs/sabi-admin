import { axiosInstance } from "./axios";
import { serviceLinks } from "./serviceLinks";
import { asyncGetItem, asyncSetItem } from "../utils/helpers";
import { ICreateWaivedProduct } from "@interface/ICreateWaivedProduct";
import { IUpdateWaivedProduct } from "@interface/IUpdateWaivedProduct";
import { ISubscribe } from "@interface/ISubscribe";
import { IVendorSignUp } from "@interface/IVendorSignUp";
import { IILoginValues } from "@interface/IloginValues";
import { IWaivedCustomerSignUp } from "@interface/IWaivedCustomerSignUp";
import { IWaivedAddTeamMate } from "src/types";
import { ISubscriptionPlanPayload } from "@interface/ISubscriptionPlan";
import { IWaivedMarketDate } from "@interface/IWaivedMarketDate";

export const vendorApi = {
  login: async (payload: IILoginValues) => {
    const hash = (await asyncGetItem("token")) || "";
    return axiosInstance(hash, undefined)
      .post(serviceLinks.login, payload)
      .then(async (res) => {
        await asyncSetItem("token", res.data.data.accessToken);
        await asyncSetItem("refresh", res.data.data.refreshToken);
        return res.data;
      })
      .catch((err) => {
        throw err?.response;
      });
  },
  // refreshToken: async () => {
  //   const refreshToken = await asyncGetItem("refresh");

  //   // Log the process for debugging
  //   console.log("Starting refresh token process");
  //   console.log("Refresh token exists:", !!refreshToken);

  //   if (!refreshToken) {
  //     console.warn("No refresh token found in storage");
  //     return null;
  //   }

  //   try {
  //     console.log("Making refresh token API call to:", serviceLinks.refresh);

  //     // Using a direct axios call without auth header for refresh
  //     const response = await axiosInstance("", undefined).post(
  //       serviceLinks.refresh,
  //       { refreshToken }
  //     );

  //     console.log("Refresh response received:", response.status);

  //     if (response.data?.data?.accessToken) {
  //       console.log("New access token received, updating storage");
  //       await asyncSetItem("token", response.data.data.accessToken);

  //       // Save new refresh token if provided
  //       if (response.data.data.refreshToken) {
  //         console.log("New refresh token received, updating storage");
  //         await asyncSetItem("refresh", response.data.data.refreshToken);
  //       }

  //       return response.data.data;
  //     } else {
  //       console.warn(
  //         "Token refresh response didn't contain expected tokens:",
  //         response.data
  //       );
  //       return null;
  //     }
  //   } catch (error) {
  //     console.error("Token refresh failed:", error);

  //     // Log more detailed error information
  //     if (error.response) {
  //       console.error("Error status:", error.response.status);
  //       console.error("Error data:", error.response.data);
  //     }

  //     // Clear tokens if the server indicated they're invalid
  //     if (
  //       error.response &&
  //       (error.response.status === 401 || error.response.status === 403)
  //     ) {
  //       console.warn("Server rejected refresh token, clearing stored tokens");
  //       localStorage.removeItem("token");
  //       localStorage.removeItem("refresh");
  //     }

  //     return null;
  //   }
  // },

  getWaivedProducts: async () => {
    const hash = (await asyncGetItem("token")) || "";
    return axiosInstance(hash, undefined)
      .get(serviceLinks.getWaivedProducts)
      .then((res) => res.data)
      .catch((err) => {
        throw err?.response;
      });
  },
  getWaivedProductById: async (id: string) => {
    const hash = (await asyncGetItem("token")) || "";
    return axiosInstance(hash, undefined)
      .get(`${serviceLinks.getWaivedProductById}?id=${id}`)
      .then((res) => res.data)
      .catch((err) => {
        throw err?.response;
      });
  },
  createWaivedProduct: async (payload: ICreateWaivedProduct) => {
    console.log("test payload:", payload);
    const hash = (await asyncGetItem("token")) || "";
    console.log("hash", hash);
    return axiosInstance(hash, undefined)
      .post(serviceLinks.createWaivedProduct, payload)
      .then((res) => res.data)
      .catch((err) => {
        throw err?.response;
      });
  },
  updateWaivedProduct: async (payload: IUpdateWaivedProduct) => {
    console.log("test payload:", payload);
    const hash = (await asyncGetItem("token")) || "";
    console.log("hash", hash);
    return axiosInstance(hash, undefined)
      .put(serviceLinks.editWaivedProduct, payload)
      .then((res) => res.data)
      .catch((err) => {
        throw err?.response;
      });
  },
  // deleteWaivedProduct: async(),
  vendorSignUp: async (payload: IVendorSignUp) => {
    console.log("test payload:", payload);
    return axiosInstance("", undefined)
      .post(serviceLinks.vendorSignUp, payload)
      .then((res) => res.data)
      .catch((err) => {
        throw err?.response;
      });
  },
  customerSubscribe: async (payload: ISubscribe) => {
    console.log("test payload:", payload);
    const hash = (await asyncGetItem("token")) || "";
    console.log("hash", hash);
    return axiosInstance(hash, undefined)
      .post(serviceLinks.vendorSubscribe, payload)
      .then((res) => res.data)
      .catch((err) => {
        throw err?.response;
      });
  },
  vendorCheckActiveSubscription: async (userId: string) => {
    const hash = (await asyncGetItem("token")) || "";
    return axiosInstance(hash, undefined).get(
      `${serviceLinks.checkActiveVendorSubcription}?userId=${userId}`
    );
  },
  changePassword: async (payload: {
    currentPassword: string;
    newPassword: string;
    confirmNewPassword: string;
  }) => {
    const hash = (await asyncGetItem("token")) || "";
    return axiosInstance(hash, undefined)
      .post(serviceLinks.changePassword, payload)
      .then((res) => res.data)
      .catch((err) => {
        throw err?.response;
      });
  },
  forgotPassword: async (payload: {
    phoneNumber?: string;
    emailAddress?: string;
  }) => {
    return axiosInstance("", undefined)
      .post(serviceLinks.forgotPassword, payload)
      .then((res) => res.data)
      .catch((err) => {
        throw err?.response;
      });
  },

  verifyOtp: async (payload: {
    phoneNumber?: string;
    emailAddress?: string;
    otp: string;
  }) => {
    return axiosInstance("", undefined)
      .post(serviceLinks.verifyOtp, payload)
      .then((res) => res.data)
      .catch((err) => {
        throw err?.response;
      });
  },

  resetPassword: async (payload: {
    phoneNumber?: string;
    emailAddress?: string;
    newPassword: string;
    confirmPassword: string;
  }) => {
    return axiosInstance("", undefined)
      .post(serviceLinks.resetPassword, payload)
      .then((res) => res.data)
      .catch((err) => {
        throw err?.response;
      });
  },
  fetchLGAs: async () => {
    const hash = (await asyncGetItem("token")) || "";
    return axiosInstance(hash, undefined).get(
      `${serviceLinks.getLGAs}?state=lagos`
    );
  },
};

//waived customer

export const waivedCustomerApi = {
  waivedCustomerSignUp: async (payload: IWaivedCustomerSignUp) => {
    console.log("test payload:", payload);
    return axiosInstance("", undefined)
      .post(serviceLinks.customerSignUp, payload)
      .then((res) => res.data)
      .catch((err) => {
        throw err?.response;
      });
  },
};

//waived admin

export const waivedAdminApi = {
  addTeamMate: async (payload: IWaivedAddTeamMate) => {
    const hash = (await asyncGetItem("token")) || "";
    return axiosInstance(hash, undefined)
      .post(serviceLinks.addTeamMate, payload)
      .then((res) => res.data)
      .catch((err) => {
        throw err?.response;
      });
  },
  getTeamMates: async () => {
    const hash = (await asyncGetItem("token")) || "";
    return axiosInstance(hash, undefined)
      .get(serviceLinks.getTeamMates)
      .then((res) => res.data)
      .catch((err) => {
        throw err?.response;
      });
  },
  getVendorAndProducts: async () => {
    const hash = (await asyncGetItem("token")) || "";
    return axiosInstance(hash, undefined)
      .get(serviceLinks.getVendorAndProducts)
      .then((res) => res.data)
      .catch((err) => {
        throw err?.response;
      });
  },
  getCustomerComplaints: async () => {
    const hash = (await asyncGetItem("token")) || "";
    return axiosInstance(hash, undefined)
      .get(serviceLinks.getCustomerComplaints)
      .then((res) => res.data)
      .catch((err) => {
        throw err?.response;
      });
  },
  editTeamMate: async (payload: IWaivedAddTeamMate, id: string) => {
    const hash = (await asyncGetItem("token")) || "";
    return axiosInstance(hash, undefined)
      .put(`${serviceLinks.editTeammate}/${id}`, payload)
      .then((res) => res.data)
      .catch((err) => {
        throw err?.response;
      });
  },
  deleteTeamMate: async (id: string) => {
    const hash = (await asyncGetItem("token")) || "";
    return axiosInstance(hash, undefined)
      .delete(`/api/Admin/team-members/${id}`)
      .then((res) => res.data)
      .catch((err) => {
        throw err?.response;
      });
  },
  getAllSubscriptionPlans: async () => {
    const hash = (await asyncGetItem("token")) || "";
    return axiosInstance(hash, undefined)
      .get(serviceLinks.getAllSubscriptionPlans)
      .then((res) => res.data)
      .catch((err) => {
        throw err?.response;
      });
  },
  addSubscriptionPlan: async (payload: ISubscriptionPlanPayload) => {
    const hash = (await asyncGetItem("token")) || "";
    return axiosInstance(hash, undefined)
      .post(serviceLinks.createSubscriptionPlan, payload)
      .then((res) => res.data)
      .catch((err) => {
        throw err?.response;
      });
  },
  updateSubscriptionPlan: async (payload: ISubscriptionPlanPayload) => {
    const hash = (await asyncGetItem("token")) || "";
    return axiosInstance(hash, undefined)
      .post(serviceLinks.updateSubscriptionPlan, payload)
      .then((res) => res.data)
      .catch((err) => {
        throw err?.response;
      });
  },
  getSubscriptionPlanById: async (id: string) => {
    const hash = (await asyncGetItem("token")) || "";
    return axiosInstance(hash, undefined)
      .post(`${serviceLinks.getSubscriptionPlanById}/?subscriptionPlanId=${id}`)
      .then((res) => res.data)
      .catch((err) => {
        throw err?.response;
      });
  },
  getUrgentPurchaseWaivedProducts: async () => {
    const hash = (await asyncGetItem("token")) || "";
    return axiosInstance(hash, undefined)
      .get(serviceLinks.getUrgentPurchaseWaivedProducts)
      .then((res) => res.data)
      .catch((err) => {
        throw err?.response;
      });
  },
  getAuditLog: async (adminId: string) => {
    const hash = (await asyncGetItem("token")) || "";
    return axiosInstance(hash, undefined)
      .get(serviceLinks.getAuditLog(adminId))
      .then((res) => res.data)
      .catch((err) => {
        throw err?.response;
      });
  },
  addWaivedMarketDate: async (payload: IWaivedMarketDate) => {
    console.log("test payload:", payload);
    const hash = (await asyncGetItem("token")) || "";
    return axiosInstance(hash, undefined)
      .post(serviceLinks.addWaivedMarketDate, null, {
        params: { nextWaiveMarketDate: payload.date },
      })
      .then((res) => res.data)
      .catch((err) => {
        throw err?.response;
      });
  },
  editWaivedMarketDate: async (payload: IWaivedMarketDate) => {
    const hash = (await asyncGetItem("token")) || "";
    return axiosInstance(hash, undefined)
      .put(serviceLinks.editWaivedMarketDate, null, {
        params: { newWaivemarketDate: payload.date },
      })
      .then((res) => res.data)
      .catch((err) => {
        throw err?.response;
      });
  },
  getNextWaivedMarketDate: async () => {
    const hash = (await asyncGetItem("token")) || "";
    return axiosInstance(hash, undefined)
      .get(serviceLinks.getNextWaivedMarketDate)
      .then((res) => res.data)
      .catch((err) => {
        throw err?.response;
      });
  },
};
