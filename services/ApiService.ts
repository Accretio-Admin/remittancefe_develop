import axios, { AxiosError } from "axios";
import {
  ERole,
  ILogin,
  IRefreshToken,
  IRegister,
  IResetPassword,
  IErrorRes,
} from "../interfaces/axios/IAxios.interface";
import {
  IConfigApiGroupsManagementCreate,
  IConfigApiGroupsManagementUpdate,
  IConfigTransactionUpdate,
} from "../interfaces/configs/IConfigTransaction.interface";
import {
  ILandBankRemoveSingleAssignCredential,
  ILandBankAddSingleAssignCredential,
  ILandBankCredentialAdd,
} from "../interfaces/landbank/ILandBankCredentials.interface";
import { IRateLimiterAddRegion } from "../interfaces/rate_limiter/IRateLimiter.interface";
import {
  IAddAssignIpUser,
  ICreateUser,
  IUpdateAssignIpUser,
  IUpdateUnlockAndLockUser,
  IUpdateUser,
} from "../interfaces/user/IUser.interface";
import { store } from "../provider/Store";
import { setShowFullPage } from "../redux/features/loading_full_page/LoadingFullPage-Slice";
import { setShowSnackBar } from "../redux/features/snack_bar_msg/SnackBarMsg-Slice";
import { LocalStorageAuthService } from "./LocalStorageService";
import { removeLocalStorageUserAndRedirect } from "./LogoutUserService";
import {
  IAdminManageApiKey,
  IGenerateApiKey,
} from "../interfaces/admins/IAdminManageApiKey.interface";
import { JwtService } from "./JwtService";
import { IUpdateLogs } from "../interfaces/logs/ILogs.interface";

let AxiosRequest = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_PROD}/v1`,
  headers: {
    "Content-Type": "application/json",
  },
});
export const handleErrorCatch = (errCatch: unknown) => {
  const errors = errCatch as Error | AxiosError;
  if (axios.isAxiosError(errors)) {
    return errors;
  }
};
const handlingError = () => {
  AxiosRequest.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      let errorResponse: IErrorRes;
      if (error.response && error.response.data) {
        // I expect the API to handle error responses in valid format
        errorResponse = error.response.data;
        // JSON stringify if you need the json and use it later
      } else if (error.request) {
        // TO Handle the default error response for Network failure or 404 etc.,
        errorResponse = error.request.message || error.request.statusText;
      } else {
        errorResponse = error.message;
      }

      switch (errorResponse.message) {
        case "Please authenticate":
          removeLocalStorageUserAndRedirect();
          break;
        case "jwt expired":
          removeLocalStorageUserAndRedirect();
          break;
        case "Internal Server Error":
          removeLocalStorageUserAndRedirect();
          break;
        case "Initialization required.":
          store.dispatch(
            setShowSnackBar({
              msg: "We have sent a code to app owner for verification. Please contact app owner for further details.",
              openMsg: true,
              severity: "warning",
              timeAutoHide: 3000,
            })
          );
          break;
        case "Assignment not found":
          return null;
        default:
          store.dispatch(
            setShowSnackBar({
              msg: errorResponse.message,
              openMsg: true,
              severity: "error",
              timeAutoHide: 3000,
            })
          );
          // Any status codes that falls outside the range of 2xx cause this function to trigger
          // Do something with response error
          break;
      }
      store.dispatch(
        setShowFullPage({
          active: false,
        })
      );
      return Promise.reject(error);
    }
  );
};
const AuthRefreshOrAccessToken = () => {
  let finalAuth: string = "";
  finalAuth = `Bearer ${
    LocalStorageAuthService().getUser()?.tokens.access.token
  }`;
  AxiosRequest.defaults.headers.common["Authorization"] = finalAuth;
};
const urlCallBack = () => {
  return typeof window !== "undefined"
    ? window.location.origin
    : process.env.NEXT_PUBLIC_URL_HOME;
};
const ApiService = () => {
  AuthRefreshOrAccessToken();
  JwtService().handleJwtExpireCheck();
  handlingError();
  const auth = () => {
    const login = (data: ILogin) => AxiosRequest.post("/auth/login", data);
    const register = (data: IRegister) =>
      AxiosRequest.post(
        `/auth/register?callback=${urlCallBack()}/auth/login`,
        data
      );
    const registerWithCodeInitializeSuperAdmin = (
      data: IRegister,
      codeSecret: string
    ) => AxiosRequest.post(`/auth/app-initialization?code=${codeSecret}`, data);
    const logout = (refreshToken: IRefreshToken) =>
      AxiosRequest.post("/auth/logout", refreshToken);
    const forgotPassword = (email: string) =>
      AxiosRequest.post(
        `/auth/forgot-password?callback=${urlCallBack()}/auth`,
        {
          email: email,
        }
      );
    const resetPassword = (data: IResetPassword) =>
      AxiosRequest.post(`/auth/reset-password?token=${data.token}`, {
        password: data.password,
      });
    const appInitialization = () =>
      AxiosRequest.get("/auth/app-initialization");
    return {
      login,
      register,
      logout,
      forgotPassword,
      resetPassword,
      registerWithCodeInitializeSuperAdmin,
      appInitialization,
    };
  };
  const users = () => {
    const getAllUsers = (
      pageNumber: number = 1,
      limit: number = 10,
      sortDefault: string = "name:asc,role:asc,email:asc",
      filter: string = ""
    ) =>
      AxiosRequest.get(
        `/users/?page=${pageNumber}&limit=${limit}&sortBy=${sortDefault}&${filter}`
      );
    const createUsers = (data: ICreateUser) => AxiosRequest.post("users", data);
    const getSingleUsers = (id: string) => AxiosRequest.get(`users/${id}`);
    const deleteSingleUsers = (id: string) =>
      AxiosRequest.delete(`users/${id}`);
    const updateSingleUsers = (id: string, data: IUpdateUser) =>
      AxiosRequest.patch(`users/${id}`, data);
    const updateUnlockAndLockUsers = (
      id: string,
      data: IUpdateUnlockAndLockUser
    ) => AxiosRequest.patch(`users/${id}`, data);
    const allAssignIpUsers = (
      id: string,
      pageNumber: number = 1,
      limit: number = 10,
      sortDefault: string = "value:asc",
      filter: string = ""
    ) =>
      AxiosRequest.get(
        `/users/limits/${id}/?page=${pageNumber}&limit=${limit}&sortBy=${sortDefault}&${filter}`
      );
    const deleteAssignIpUser = (id: string) =>
      AxiosRequest.delete(`/userlimitations/${id}`);
    const updateAssignIpUser = (id: string, data: IUpdateAssignIpUser) =>
      AxiosRequest.patch(`/userlimitations/${id}`, data);
    const addAssignIpUser = (data: IAddAssignIpUser) =>
      AxiosRequest.post(`/userlimitations`, data);
    const getAllBulkLimitation = (ids: string) =>
      AxiosRequest.get(`/userlimitations/bulk/${ids}`);
    return {
      getAllUsers,
      createUsers,
      getSingleUsers,
      updateSingleUsers,
      deleteSingleUsers,
      allAssignIpUsers,
      deleteAssignIpUser,
      updateAssignIpUser,
      addAssignIpUser,
      updateUnlockAndLockUsers,
      getAllBulkLimitation,
    };
  };
  const regions = () => {
    const getAllRegions = (pageNumber: number = 1, limit: number = 10) =>
      AxiosRequest.get(`regions/?page=${pageNumber}&limit=${limit}`);
    const addRegion = (data: IRateLimiterAddRegion) =>
      AxiosRequest.post("regions", data);
    const removeRegion = (id: string) => AxiosRequest.delete(`regions/${id}`);
    return {
      getAllRegions,
      addRegion,
      removeRegion,
    };
  };
  const landBank = () => {
    const getAllCredentials = (pageNumber: number = 1, limit: number = 10) =>
      AxiosRequest.get(
        `landbank/credentials/?page=${pageNumber}&limit=${limit}`
      );
    const addCredential = (data: ILandBankCredentialAdd) =>
      AxiosRequest.post("landbank/credentials", data);
    const removeCredential = (id: string) =>
      AxiosRequest.delete(`landbank/credentials/${id}`);
    const getAllCredentialAssignById = (
      id: string,
      pageNumber: number = 1,
      limit: number = 10
    ) =>
      AxiosRequest.get(
        `landbank/credentials/${id}/?page=${pageNumber}&limit=${limit}`
      );
    const addSingleCredentialForUserById = (
      id: string,
      data: ILandBankAddSingleAssignCredential
    ) => AxiosRequest.post(`landbank/credentials/${id}`, data);
    const removeSingleCredentialForUserById = (
      id: string,
      data: ILandBankRemoveSingleAssignCredential
    ) => AxiosRequest.patch(`landbank/credentials/${id}`, data);
    const checkCredentialForUserById = (idCredential: string, idUser: string) =>
      AxiosRequest.get(`landbank/credentials/${idCredential}/${idUser}`);
    return {
      getAllCredentials,
      removeCredential,
      addCredential,
      getAllCredentialAssignById,
      addSingleCredentialForUserById,
      removeSingleCredentialForUserById,
      checkCredentialForUserById,
    };
  };
  const transaction = () => {
    const getAllTransaction = (
      pageNumber: number = 1,
      limit: number = 10,
      sortDefault: string = "user.email:asc,transactionCode:asc,typePaymentColum:asc,statusPaymentColum:asc,ipColum:asc",
      filter: string = ""
    ) =>
      AxiosRequest.get(
        `/landbank/transactions/?page=${pageNumber}&limit=${limit}&sortBy=${sortDefault}&${filter}`
      );
    return { getAllTransaction };
  };
  const manageApiKeys = () => {
    const getAllApiKeysSingleUser = (userId: string) =>
      AxiosRequest.get(`token/code/${userId}`);
    const generateApiKey = (data: IGenerateApiKey) =>
      AxiosRequest.post("token/code/", data);
    const generateUpdateApiKey = (id: string) =>
      AxiosRequest.patch(`token/code/${id}`);
    const reUpdateApiKey = (data: IAdminManageApiKey, id: string) =>
      AxiosRequest.put(`token/code/${id}`, data);
    const reUpdateApiKeyForAssign = (
      data: { endpointGroupId: string },
      id: string
    ) => AxiosRequest.put(`token/code/${id}`, data);
    const reUpdateApiKeyForActivate = (data: { active: boolean }, id: string) =>
      AxiosRequest.put(`token/code/${id}`, data);
    return {
      getAllApiKeysSingleUser,
      generateApiKey,
      generateUpdateApiKey,
      reUpdateApiKey,
      reUpdateApiKeyForAssign,
      reUpdateApiKeyForActivate,
    };
  };
  const configs = () => {
    const getAllConfigs = () => AxiosRequest.get("config");
    const updateConfigs = (id: string, data: any) =>
      AxiosRequest.patch(`config/${id}`, data);
    return { getAllConfigs, updateConfigs };
  };
  const apiGroupsManagement = () => {
    const getApiGroupsManagement = (
      pageNumber: number = 1,
      limit: number = 10,
      sortDefault: string = "",
      filter: string = ""
    ) =>
      AxiosRequest.get(
        `token/endpoints/group/?page=${pageNumber}&limit=${limit}&sortBy=${sortDefault}&${filter}`
      );
    const getEndPointsApiGroups = () => AxiosRequest.get("token/endpoints");
    const createApiGroupManagement = (data: IConfigApiGroupsManagementCreate) =>
      AxiosRequest.post("/token/endpoints/group", data);
    const updateApiGroupManagement = (
      id: string,
      data: IConfigApiGroupsManagementUpdate
    ) => AxiosRequest.put(`/token/endpoints/group/${id}`, data);
    const deleteApiGroupManagement = (id: string) =>
      AxiosRequest.delete(`/token/endpoints/group/${id}`);
    return {
      getApiGroupsManagement,
      createApiGroupManagement,
      deleteApiGroupManagement,
      updateApiGroupManagement,
      getEndPointsApiGroups
    };
  };
  const logs = () => {
    const createLog = () => AxiosRequest.post("logs");
    const getAllLogs = (
      pageNumber: number = 1,
      limit: number = 10,
      sortDefault: string = "",
      filter: string = ""
    ) =>
      AxiosRequest.get(
        `logs/?page=${pageNumber}&limit=${limit}&sortBy=${sortDefault}&${filter}`
      );
    const updateLog = (id: string, data: IUpdateLogs) =>
      AxiosRequest.put(`logs/${id}`, data);
    const getLogById = (id: string) => AxiosRequest.get(`logs/${id}`);
    return {
      createLog,
      getAllLogs,
      updateLog,
      getLogById,
    };
  };
  const other = () => {
    const getAllForExcel = (
      nameRoute: string = "",
      sortDefault: string = "",
      filter: string = ""
    ) =>
      AxiosRequest.get(`/${nameRoute}/?page=0&sortBy=${sortDefault}&${filter}`);
    const regionIcons = () =>
      axios.get("https://restcountries.com/v2/all?fields=alpha2Code,flags");
    return { regionIcons, getAllForExcel };
  };
  return {
    auth,
    users,
    other,
    regions,
    landBank,
    transaction,
    manageApiKeys,
    configs,
    apiGroupsManagement,
    logs,
  };
};

export { ApiService };
