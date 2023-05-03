import { IUserInfo } from "../user/IUser.interface";
interface IAdminManageApiKey {
  token: string;
  expiration: string;
  active: boolean;
  deleted: boolean;
  user: IUserInfo;
  endpointGroupId: EndpointGroupID;
  id: string;
  refferer?: IUserInfo;
}

interface EndpointGroupID {
  name: string;
  endpoints: Endpoint[];
  deleted: boolean;
  id: string;
}
interface IAdminManageApiKeyRegenerate extends ICallbackUpdateListApiKeys {
  apiToken: string;
  idApiToken:string,
}
interface ICallbackUpdateListApiKeys {
  callbackUpdateListApiKeys: () => Promise<unknown>;
}

interface IGenerateApiKey {
  referrerId: string,
  userId: string, 
  endpointGroupId: string,
}
enum Endpoint {
  ABC = "a/b/c",
}

export type { IAdminManageApiKey , IGenerateApiKey , IAdminManageApiKeyRegenerate , ICallbackUpdateListApiKeys};
